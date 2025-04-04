import { Container } from "@chakra-ui/react";
import { Heading, Flex } from "@chakra-ui/react";
import React from "react";
import Hero from "./components/Hero";
import { useState } from "react";
import { Highlight } from "@chakra-ui/react";
import { Icon, Switch } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ColorModeButton } from "./components/ui/color-mode";

function App() {
  const [heading, setHeading] = useState("Define X");

  return (
    <Container width='100%'>
      <Flex justify="end" align="center" p='10px'>
      <ColorModeButton size = 'xl'/>
      </Flex>
      <Container maxWidth="6xl" minHeight="100vh">
        <Heading
          as="h1"
          size="7xl"
          p="10px"
          textAlign="center"
          fontWeight={600}
          base={{ size: "5xl" }}
        >
          <Highlight query="X" styles={{ px: "0.5", color: "purple.500" }}>
            {heading}
          </Highlight>
        </Heading>
        <Hero></Hero>
      </Container>
    </Container>
  );
}

export default App;
