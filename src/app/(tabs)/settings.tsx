import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Input,
  Modal,
  Stack,
  Text,
  WarningOutlineIcon,
} from "native-base";
import { Controller, useForm } from "react-hook-form";

import { useTransactionsStore } from "@/store/transactions";

type FormData = {
  amount: string;
};

export default function Settings() {
  const [showModal, setShowModal] = useState(false);

  const { setGoal } = useTransactionsStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: undefined,
    },
  });

  const handleGoal = ({ amount }: FormData) => {
    setGoal(amount);
    reset();
    setShowModal(true);
  };

  const onSubmit = (data: FormData) => handleGoal(data);

  return (
    <Flex flex={1} bg="white">
      <Heading m={4}>Alterar meta</Heading>
      <Flex flex={1}>
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
                  value={value}
                  onChangeText={onChange}
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
        Definir meta
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Parabéns</Modal.Header>
          <Modal.Body>
            <Text>Meta definida com sucesso!</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="success"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Fechar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>
  );
}
