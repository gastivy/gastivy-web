import * as Yup from "yup";

export const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at least 32 characters")
    .required("Password is required"),
});
