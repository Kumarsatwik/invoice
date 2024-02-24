import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email format")
    .required("Email is required"),
  password: Yup.string().min(4).required("Password is required"),
});
