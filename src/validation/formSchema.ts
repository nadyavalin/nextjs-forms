import * as Yup from "yup";

import {
  PICTURE_SIZE_LIMIT_BIT,
  PICTURE_SIZE_LIMIT_BITE,
  PICTURE_SIZE_LIMIT_MB,
} from "../constants/constants";
import { FileList } from "../types/file-types";

const maxSize = PICTURE_SIZE_LIMIT_MB * PICTURE_SIZE_LIMIT_BITE * PICTURE_SIZE_LIMIT_BIT;
const allowedExtensions = ["image/png", "image/jpeg"];

export const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z]/, "The name must start with a capital letter")
    .matches(/^[A-Za-z]+$/, "The name must contain only English letters"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .typeError("Age cannot be empty"),
  email: Yup.string().email("Incorrect email format").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^[A-Za-z\d$@!%*?&]+$/, "Password can only contain English letters")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "The password must contain at least one capital letter")
    .matches(/[a-z]/, "The password must contain at least one lowercase letter")
    .matches(/\d/, "The password must contain at least one number")
    .matches(/[$@!%*?&]/, "The password must contain at least one special character"),
  confirmPassword: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
    picture: Yup.mixed<FileList>()
    .required("Picture is required")
    .test('fileSize', 'File too large', (value) => {
      return value && value.length > 0 && value[0].size <= maxSize;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return value && value.length > 0 && allowedExtensions.includes(value[0].type);
    }),

  terms: Yup.bool().oneOf([true], "You must agree to the terms"),
});
