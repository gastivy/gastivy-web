import { useDisclosure } from "astarva-ui";

import { Profile } from "@/components/base/Profile";
import Layout from "@/components/mobile/Layout";
import { TypesTransactions } from "@/modules/financeApp/category/models";

import { AddTransactionsDrawer } from "../transactions/components/AddTransactionDrawer";
import { Balance } from "./components/Balance";
import { Transactions } from "./components/Transaction";

const HomeFinanceContainer = () => {
  const incomeDisclosure = useDisclosure({ open: false });
  const expensesDisclosure = useDisclosure({ open: false });
  const transferDisclosure = useDisclosure({ open: false });
  return (
    <Layout
      _flex={{
        paddingBottom: "5.5rem",
      }}
    >
      {/* Income Drawer */}
      <AddTransactionsDrawer
        typeTransaction={TypesTransactions.INCOME}
        isVisible={incomeDisclosure.isOpen}
        onBack={incomeDisclosure.onClose}
      />

      {/* Expenses Drawer */}
      <AddTransactionsDrawer
        typeTransaction={TypesTransactions.EXPENSES}
        isVisible={expensesDisclosure.isOpen}
        onBack={expensesDisclosure.onClose}
      />

      {/* Transfer Drawer */}
      <AddTransactionsDrawer
        typeTransaction={TypesTransactions.TRANSFER}
        isVisible={transferDisclosure.isOpen}
        onBack={transferDisclosure.onClose}
      />

      <Profile />
      <Balance
        onIncome={incomeDisclosure.onOpen}
        onExpenses={expensesDisclosure.onOpen}
        onTransfer={transferDisclosure.onOpen}
      />

      <Transactions />
    </Layout>
  );
};

export default HomeFinanceContainer;
