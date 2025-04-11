import React, { useEffect } from "react";
import { Center, Container, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Definitions from "./Definitions";
import { useState } from "react";

function Hero(props) {
  const [word, setWord] = useState("");

  useEffect(() => {
    if(word == '')
      props.heading('Define X')
    else
      props.heading(word)
  },[word])

  return (
    <Center>
      <Flex
        flexDir="column"
        as="main"
        gap="30px"
        m="30px"
        justify="center"
        align="center"
      >
        <Input
          variant="flushed"
          placeholder="Search a word"
          size="lg"
          onChange={(event) => {
            let word = event.target.value;
            setWord(word);
          }}
          colorPalette="purple"
        />
        <Definitions word={word}></Definitions>
      </Flex>
    </Center>
  );
}
export default Hero;
