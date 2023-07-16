import { create } from "zustand";

type Transaction = {
  description: string;
  amount: string;
};

type TransactionState = {
  goal?: string;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  setGoal: (amount: string) => void;
};

export const useTransactionsStore = create<TransactionState>((set) => ({
  goal: undefined,
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  setGoal: (amount) =>
    set(() => ({
      goal: amount,
    })),
}));
