import * as Yup from "yup";

export const schemaCategory = Yup.object().shape({
  name: Yup.string().required("Name Category is required"),
  target: Yup.number().required("Target is required"),
});
