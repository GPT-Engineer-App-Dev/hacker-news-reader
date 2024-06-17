import React, { useEffect, useState } from "react";
import { Container, VStack, Text, Link, Box, Spinner, useColorMode, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const topStories = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json");
        const storyIds = topStories.data.slice(0, 5);
        const storyPromises = storyIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const storyResults = await Promise.all(storyPromises);
        setStories(storyResults.map(result => result.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top stories:", error);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        alignSelf="flex-end"
        m={4}
      />
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <VStack spacing={4} overflowY="auto" maxH="80vh" width="100%">
          {stories.map(story => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text fontSize="xl" fontWeight="bold">{story.title}</Text>
              <Text>Upvotes: {story.score}</Text>
              <Link href={story.url} color="teal.500" isExternal>Read more</Link>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;