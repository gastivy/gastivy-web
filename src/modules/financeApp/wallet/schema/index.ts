import * as Yup from "yup";

export const schemaWallet = Yup.object().shape({
  name: Yup.string().required("Name Wallet is required"),
  type: Yup.number().required("Type Wallet is required"),
  balance: Yup.number()
    .required("Balance is required")
    .min(1, "Balance must be at least 1"),
});
