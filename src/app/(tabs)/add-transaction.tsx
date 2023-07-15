import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  Stack,
  WarningOutlineIcon,
} from "native-base";

import { useTransactionsStore } from "@/store/transactions";
import { FontAwesome } from "@expo/vector-icons";

type FormData = {
  description: string;
  amount: number;
};

export default function AddTransaction() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      description: "",
      amount: undefined,
    },
  });

  const router = useRouter();

  const { addTransaction } = useTransactionsStore();

  const handleTransaction = ({ description, amount }: FormData) => {
    addTransaction({ description, amount });
    reset();
    router.replace("/");
  };

  const onSubmit = (data: FormData) => handleTransaction(data);

  return (
    <Flex flex={1} bg="white">
      <Flex flex={1}>
        <Controller
          control={control}
          name="description"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormControl
              isRequired
              isInvalid={errors.description?.type === "required"}
            >
              <Stack mx="4">
                <FormControl.Label>Descrição</FormControl.Label>
                <Input
                  isInvalid={errors.description?.type === "required"}
                  value={value}
                  onChangeText={onChange}
                  type="text"
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="comment" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  A descrição é obrigatória
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="amount"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormControl
              isRequired
              isInvalid={errors.amount?.type === "required"}
            >
              <Stack mx="4">
                <FormControl.Label>Valor</FormControl.Label>
                <Input
                  value={value?.toString()}
                  onChangeText={(value) => onChange(Number(value))}
                  isInvalid={errors.amount?.type === "required"}
                  type="text"
                  keyboardType="numeric"
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="dollar" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  O valor é obrigatório
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>
          )}
        />
      </Flex>
      <Button
        m={4}
        leftIcon={<Icon as={FontAwesome} name="plus-circle" color="white" />}
        colorScheme="success"
        onPress={handleSubmit(onSubmit)}
      >
        Adicionar item
      </Button>
    </Flex>
  );
}
