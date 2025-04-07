import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "./styles.css";
import { addForm } from "../store/formSlice";
import { ErrorState, FormState } from "../types/types";
import { formSchema } from "../validation/formSchema";
import {
  PICTURE_SIZE_LIMIT_MB,
  PICTURE_SIZE_LIMIT_BIT,
  PICTURE_SIZE_LIMIT_BITE,
} from "../constants/constants";
import { RootState } from "../store/store";

export const FirstForm = () => {
  const [formState, setFormState] = useState<FormState>({
    id: 1,
    name: "",
    age: 1,
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    picture: "",
    terms: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorState>({});
  const countries = useSelector((state: RootState) => state.countries.countries);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formState).every((value) => value !== "" && value !== null);
    setIsFormValid(isValid);
  }, [formState]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = event.target;
    const isCheckbox = type === "checkbox";
    setFormState({
      ...formState,
      [name]: isCheckbox ? (event.target as HTMLInputElement).checked : value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = PICTURE_SIZE_LIMIT_MB * PICTURE_SIZE_LIMIT_BITE * PICTURE_SIZE_LIMIT_BIT;
      const allowedExtensions = ["image/png", "image/jpeg"];
      if (!allowedExtensions.includes(file.type) || file.size > maxSize) {
        setErrors({ ...errors, picture: "Invalid file type or size" });
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const base64String = reader.result.toString();
            dispatch({ type: "SET_PICTURE", payload: base64String });
            setFormState({ ...formState, picture: base64String });
          }
        };
        reader.readAsDataURL(file);
        setErrors((prevErrors) => ({ ...prevErrors, picture: "" }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await formSchema.validate(formState, { abortEarly: false });
      dispatch(addForm(formState));
      navigate("/");
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const formattedErrors: { [key: string]: string } = {};
        validationErrors.inner.forEach((error: Yup.ValidationError) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
        setErrors(formattedErrors);
        setHasSubmitted(true);
      }
    }
  };

  return (
    <>
      <main className="main">
        <h1>First Form</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form__item">
            <label htmlFor="name">Name:</label>
            <div className="form__item_input">
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
              />
              <p className="error">{errors.name}</p>
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="age">Age:</label>
            <div className="form__item_input">
              <input
                type="number"
                id="age"
                name="age"
                value={formState.age}
                onChange={handleChange}
              />
              <p className="error">{errors.age}</p>
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="email">Email:</label>
            <div className="form__item_input">
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              <p className="error">{errors.email}</p>
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="password">Password:</label>
            <div className="form__item_input">
              <input
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
              <p className="error">{errors.password}</p>
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="form__item_input">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
              />
              <p className="error">{errors.confirmPassword}</p>
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="gender">Gender:</label>
            <div className="form__item_input">
              <select id="gender" name="gender" value={formState.gender} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <p className="error">{errors.gender}</p>
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="country">Country:</label>
            <div className="form__item_input">
              <input
                type="text"
                id="country"
                name="country"
                list="countryList"
                value={formState.country}
                onChange={handleChange}
              />
              <datalist id="countryList">
                {countries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
              <p className="error">{errors.country}</p>
            </div>
          </div>
          <div className="form__item">
            <label htmlFor="picture">Upload photo:</label>
            <div className="input__picture-block">
              <input
                className="input__picture"
                type="file"
                id="picture"
                name="picture"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
              <p className="error">{errors.picture}</p>
            </div>
          </div>
          <div>
            <label htmlFor="terms" className="form__checkbox">
              <input
                className="input__checkbox"
                type="checkbox"
                id="terms"
                name="terms"
                checked={formState.terms}
                onChange={handleChange}
              />
              <div className="agreement__block">
                <p className="agreement__text">I accept the Terms of Agreement</p>
                <p className="error">{errors.terms}</p>
              </div>
            </label>
          </div>
          <button type="submit" disabled={!hasSubmitted && !isFormValid}>
            Submit
          </button>
        </form>
      </main>
    </>
  );
};
