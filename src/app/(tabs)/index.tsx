import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils/currency";
import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  Progress,
  Text,
  Heading,
  Container,
  Flex,
  FlatList,
  Icon,
  theme,
} from "native-base";
import { useTransactionsStore } from "@/store/transactions";
import EmptyList from "@/components/EmptyList";

export default function Home() {
  const [value, setValue] = useState(0);
  const { transactions } = useTransactionsStore();

  const handleProgress = () => {
    const initialValue = 0;
    const result = transactions.reduce(
      (accumulator, item) => accumulator + Number(item.amount),
      initialValue
    );

    setValue(result);
  };

  useEffect(() => {
    handleProgress();
  }, [transactions]);

  return (
    <Flex flex={1} bg="white">
      <Box m={4}>
        <Container>
          <Heading>Meta do mês:</Heading>
        </Container>
        <Flex flexDirection="row" justifyContent="space-between" mt="3">
          <Text fontSize="lg" color="green.500">
            {currencyFormatter(value > 0 ? value : 0)}
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
        data={transactions}
        keyExtractor={(item) => item.amount.toString()}
        ListEmptyComponent={EmptyList}
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
              name={Number(item.amount) > 0 ? "arrow-up" : "arrow-down"}
              color={
                Number(item.amount) > 0
                  ? theme.colors.success[500]
                  : theme.colors.error[500]
              }
              mr="2"
            />
            <Box>
              <Heading size="md" my={1}>
                {currencyFormatter(Number(item.amount))}
              </Heading>
              <Text fontWeight="500">{item.description}</Text>
            </Box>
          </Flex>
        )}
      ></FlatList>
    </Flex>
  );
}
