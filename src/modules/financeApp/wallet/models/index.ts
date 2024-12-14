import { HttpResponse } from "@/types/HttpResponse";

export type WalletResponse = HttpResponse<Wallet[]>;
export type BalanceResponse = HttpResponse<Balance>;

export interface CreateWalletRequest {
  name: string;
  balance: number;
}

export interface Wallet {
  id: string;
  user_id: string;
  name: string;
  balance: number;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Balance {
  balance: number;
}
