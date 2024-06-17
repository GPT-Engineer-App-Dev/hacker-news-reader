import { Container, Text, VStack, Button, useColorMode } from "@chakra-ui/react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;