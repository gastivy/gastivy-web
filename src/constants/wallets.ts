import { WalletsType } from "@/modules/financeApp/wallet/models";

export const typeWalletOptions = [
  { label: "Cash", value: WalletsType.CASH },
  { label: "ATM", value: WalletsType.ATM },
  { label: "E-Money", value: WalletsType.E_MONEY },
  { label: "Assets", value: WalletsType.ASSETS },
];
