import { HttpResponse } from "@/types/HttpResponse";

export interface CategoryTransactionRequest {
  name: string;
  type: number;
}

export enum TypesTransactions {
  INCOME = 1,
  EXPENSES = 2,
}

export interface CategoryTransaction {
  id: string;
  name: string;
  type: TypesTransactions;
}

export type CategoryTransactionResponse = HttpResponse<CategoryTransaction[]>;
