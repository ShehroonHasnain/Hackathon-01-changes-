import * as yup from "yup"

export  const signupSchema = yup.object().shape({
    email: yup.string().email().required(),
    name:  yup.string().required(),
    password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
    name: yup.string().required(),
    phone: yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    address: yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters"),
    gender: yup.string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Gender must be either 'male', 'female', or 'other'"),
    file: yup.mixed().test(
      "fileRequired",
      "A file is required",
      (value) =>typeof value !== null && typeof value !== "undefined" && typeof value !== "string"
    ).required('file is required')
})
