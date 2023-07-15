import { create } from "zustand";

type Transaction = {
  description: string;
  amount: number;
};

type TransactionState = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

export const useTransactionsStore = create<TransactionState>((set) => ({
  transactions: [],
  addTransaction: (transaction: Transaction) =>
    set((state: TransactionState) => ({
      transactions: [...state.transactions, transaction],
    })),
}));
