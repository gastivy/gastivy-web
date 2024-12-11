interface TransactionRequest {
  category_id: string;
  money: number;
  date: Date;
  description?: string;
  name: string;
}

export interface CreateTransactionRequest {
  transactions: TransactionRequest[];
}
