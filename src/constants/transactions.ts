import { TypesTransactions } from "@/modules/financeApp/category/models";

export const typeTransactionOptions = [
  { label: "Income", value: TypesTransactions.INCOME },
  { label: "Expenses", value: TypesTransactions.EXPENSES },
  { label: "Transfer", value: TypesTransactions.TRANSFER },
];

export const MenuTransactions = [
  {
    label: "Income",
    value: TypesTransactions.INCOME,
    icon: "Arrow-Down-outline",
    color: "green400",
    backgroundColor: "green50",
  },
  {
    label: "Expenses",
    value: TypesTransactions.EXPENSES,
    icon: "Arrow-Up-outline",
    color: "red400",
    backgroundColor: "red50",
  },
  {
    label: "Transfer",
    value: TypesTransactions.TRANSFER,
    icon: "Swap-Horizontal-outline",
    color: "blue400",
    backgroundColor: "blue50",
  },
];
