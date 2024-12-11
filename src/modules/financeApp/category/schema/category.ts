import * as Yup from "yup";

export const schemaCategoryTransaction = Yup.object().shape({
  name: Yup.string().required("Name Category is required"),
  type: Yup.number().required("Target is required"),
});

// export const schemaTransaction = Yup.object().shape({
//   transactions: Yup.array().of(
//     Yup.object().shape({
//       category_id: Yup.string().required("Category Transaction is required"),
//       money: Yup.number().required("Money is required"),
//       date: Yup.date().required("Date is required"),
//       description: Yup.string(),
//       name: Yup.string().required("Name Transaction is required"),
//     })
//   ),
// });

export const schemaTransaction = Yup.object().shape({
  transactions: Yup.array()
    .of(
      Yup.object().shape({
        category_id: Yup.string().required("Category ID is required"),
        money: Yup.number()
          .required("Money is required")
          .min(1, "Money must be at least 1"),
        date: Yup.date().required("Date is required"),
        description: Yup.string(),
        name: Yup.string().required("Name is required"),
      })
    )
    .required("Transactions are required"),
});
