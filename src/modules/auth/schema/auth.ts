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

export const schemaRegister = Yup.object().shape({
  name: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at least 32 characters")
    .required("Password is required"),
});
