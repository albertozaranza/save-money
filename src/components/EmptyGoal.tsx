import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Button, Flex, Icon, Text } from "native-base";

export default function EmptyList() {
  return (
    <>
      <Flex flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="lg">Você ainda não tem uma meta definida</Text>
      </Flex>
      <Link href="/settings" asChild>
        <Button
          mt={4}
          leftIcon={<Icon as={FontAwesome} name="plus-circle" color="white" />}
          colorScheme="success"
        >
          Adicionar meta
        </Button>
      </Link>
    </>
  );
}
