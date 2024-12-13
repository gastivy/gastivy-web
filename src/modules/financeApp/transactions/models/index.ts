interface TransactionRequest {
  category_id: string;
  name: string;
  description?: string;
  from_wallet?: string;
  to_wallet?: string;
  money: number;
  date: Date;
}

export interface CreateTransactionRequest {
  transactions: TransactionRequest[];
}
