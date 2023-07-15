import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Button, Flex, Icon, Text } from "native-base";

export default function EmptyList() {
  return (
    <>
      <Flex flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="lg">Você ainda não tem nenhum item cadastrado</Text>
      </Flex>
      <Link href="/add-transaction" asChild>
        <Button
          mt={4}
          leftIcon={<Icon as={FontAwesome} name="plus-circle" color="white" />}
          colorScheme="success"
        >
          Adicionar item
        </Button>
      </Link>
    </>
  );
}
