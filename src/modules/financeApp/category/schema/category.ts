import * as Yup from "yup";

export const schemaCategoryTransaction = Yup.object().shape({
  name: Yup.string().required("Category Transaction is required"),
  type: Yup.number().required("Type Transaction is required"),
});
