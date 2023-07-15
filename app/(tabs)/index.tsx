import { useState, useEffect } from "react";
import { currencyFormatter } from "@/src/utils/currency";
import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  Progress,
  Text,
  Heading,
  Container,
  Flex,
  FlatList,
  Divider,
  Icon,
  theme,
} from "native-base";

const array = [
  { description: "Almoço", value: 100 },
  { description: "Delivery", value: -20 },
  { description: "Delivery", value: -30 },
  { description: "Janta", value: 50 },
];

export default function TabOneScreen() {
  const [value, setValue] = useState(0);

  const handleProgress = () => {
    const initialValue = 0;
    const result = array.reduce(
      (accumulator, item) => accumulator + item.value,
      initialValue
    );

    setValue(result);
  };

  useEffect(() => {
    handleProgress();
  }, []);

  return (
    <Flex flex={1} bg="white">
      <Box m={4}>
        <Container>
          <Heading>Meta do mês:</Heading>
        </Container>
        <Flex flexDirection="row" justifyContent="space-between" mt="3">
          <Text fontSize="lg" color="green.500">
            {currencyFormatter(value)}
          </Text>
          <Text fontSize="lg">de R$ 600,00</Text>
        </Flex>
        <Progress
          value={(value / 600) * 100}
          size="md"
          colorScheme="green"
          my="3"
        />
      </Box>
      <FlatList
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        data={array}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => (
          <Flex
            w="100%"
            flexDirection="row"
            alignItems="center"
            p={2}
            mb={4}
            rounded="lg"
            borderColor="coolGray.200"
            borderWidth="1"
          >
            <Icon
              as={FontAwesome}
              name={item.value > 0 ? "arrow-up" : "arrow-down"}
              color={
                item.value > 0
                  ? theme.colors.success[500]
                  : theme.colors.error[500]
              }
              mr="2"
            />
            <Box>
              <Heading size="md" my={1}>
                {currencyFormatter(item.value)}
              </Heading>
              <Text fontWeight="500">{item.description}</Text>
            </Box>
          </Flex>
        )}
      ></FlatList>
    </Flex>
  );
}
