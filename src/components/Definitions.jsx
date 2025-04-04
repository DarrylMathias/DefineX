import {
  Container,
  Text,
  ProgressCircle,
  Box,
  Center,
  Separator,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Definitions(props) {
  const [dataObj, setDataObj] = useState({
    defintion: ["Start by searching for a word to see its definition!"],
    synonym: [""],
    antonym: [""],
    phonetic: "",
    audio: "",
  });
  const [loading, setLoader] = useState(false);
  let lang = "en";

  useEffect(() => {
    if (!props.word) return;
    async function fetchData() {
      setLoader(true);
      const rawData = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${props.word}`
      );
      if (rawData.status == 404) {
        console.log("Could'nt Fetch API");
        setDataObj({
          defintion: [
            "Oops! No definition found for this word. Try another one.",
          ],
          synonym: [""],
          antonym: [""],
          phonetic: "",
          audio: "",
        });
      } else {
        const data = await rawData.json();
        let definitionArr = [];
        let synonym = [];
        let antonym = [];
        data.map((dataObject) => {
          dataObject.meanings.map((meaning) => {
            meaning.synonyms.map((singleSyn) => {
              synonym.push(singleSyn);
            });
            meaning.antonyms.map((singleAnt) => {
              antonym.push(singleAnt);
            });
            meaning.definitions.map((singleDef) => {
              definitionArr.push(singleDef.definition);
            });
          });
        });

        setDataObj(() => ({
          defintion: [...new Set(definitionArr)],
          synonym: [...new Set(synonym)],
          antonym: [...new Set(antonym)],
          phonetic: data[0].phonetic,
          audio:
            data[0].phonetics?.length > 0 && data[0].phonetics[0]?.audio
              ? data[0].phonetics[0].audio
              : "",
        }));
      }
      setLoader(false);
    }
    fetchData();
  }, [props.word]);

  return (
    <Container>
      <Container
        bgColor="gray.700"
        color="gray.50"
        borderRadius="10px"
        py="5px"
        width="70vw"
      >
        <Flex padding="0px" py='10px' width="100%" wrap="wrap" gap="30px" justify='space-between' align='center'>
          {dataObj.phonetic ? (
            <span>
              <Text fontWeight={800} display="inline" textStyle="xl">
                Phonetic{" "}
              </Text>{" "}
              : {dataObj.phonetic}
            </span>
          ) : (
            ""
          )}
          <Text>
            {dataObj.audio && (
              <audio src={dataObj.audio} controls style={{ width: "250px" }} />
            )}
          </Text>
        </Flex>
        {dataObj.defintion.map((singleDef, index) => (
          <Box
            key={singleDef}
            bgColor="gray.500"
            borderRadius="10px"
            my="30px"
            p="10px"
          >
            {loading ? (
              <Center>
                <ProgressCircle.Root value={null} size="lg" p="20px">
                  <ProgressCircle.Circle css={{ "--thickness": "2px" }}>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range strokeLinecap="round" />
                  </ProgressCircle.Circle>
                </ProgressCircle.Root>
              </Center>
            ) : (
              <Box>
                <Text
                  py="10px"
                  textStyle="lg"
                  color="purple.300"
                  fontWeight={700}
                >
                  {singleDef}
                </Text>
                {!loading && (
                  <Separator colorPalette="purple" size="lg" my="10px" />
                )}
                <Text textStyle="lg">
                  {dataObj.synonym[index] ? (
                    <span>
                      <Text fontWeight={800} display="inline">
                        Synonym
                      </Text>{" "}
                      : {dataObj.synonym[index]}
                    </span>
                  ) : (
                    ""
                  )}
                </Text>
                <Text textStyle="lg">
                  {dataObj.antonym[index] ? (
                    <span>
                      <Text fontWeight={800} display="inline">
                        Antonym
                      </Text>{" "}
                      : {dataObj.antonym[index]}
                    </span>
                  ) : (
                    ""
                  )}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Container>
    </Container>
  );
}

export default Definitions;
