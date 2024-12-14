import { HttpResponse } from "@/types/HttpResponse";

interface TransactionRequest {
  category_id: string;
  name: string;
  description?: string;
  from_wallet?: string;
  to_wallet?: string;
  money: number;
  date: Date;
  fee?: number;
}

export interface CreateTransactionRequest {
  transactions: TransactionRequest[];
}

export interface Transactions {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  description: string | null;
  money: number;
  date: Date;
  from_wallet_name: string | null;
  to_wallet_name: string | null;
  type: 1 | 2 | 3;
}

export type TransactionsResponse = HttpResponse<Transactions[]>;
