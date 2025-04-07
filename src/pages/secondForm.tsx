import { useCallback } from "react";
import { useForm, Controller, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { addForm } from "../store/formSlice";
import { FormState } from "../types/types";
import { formSchema } from "../validation/formSchema";
import { RootState } from "../store/store";
import { yupResolver } from "@hookform/resolvers/yup";

export const SecondForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries.countries);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  }: UseFormReturn<FormState> = useForm<FormState>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (data: FormState) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          dispatch(addForm({ ...data, picture: reader.result.toString() }));
          navigate("/");
        }
      };
      if (data.picture && data.picture[0]) {
        reader.readAsDataURL(data.picture[0]);
      } else {
        dispatch(addForm({ ...data, isNew: true }));
        navigate("/");
      }
    },
    [dispatch, navigate],
  );

  return (
    <main className="main">
      <h1>Second Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="form__item">
          <label htmlFor="name">Name:</label>
          <div className="form__item_input">
            <input id="name" type="text" {...register("name")} />
            <p className="error">{errors.name?.message}</p>
          </div>
        </div>
        <div className="form__item">
          <label htmlFor="age">Age:</label>
          <div className="form__item_input">
            <input type="number" {...register("age")} />
            <p className="error">{errors.age?.message}</p>
          </div>
        </div>
        <div className="form__item">
          <label htmlFor="email">Email:</label>
          <div className="form__item_input">
            <input type="email" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </div>
        </div>
        <div className="form__item">
          <label htmlFor="password">Password:</label>
          <div className="form__item_input">
            <input type="password" {...register("password")} />
            <p className="error">{errors.password?.message}</p>
          </div>
        </div>
        <div className="form__item">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="form__item_input">
            <input id="confirmPassword" type="password" {...register("confirmPassword")} />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>
        </div>
        <div className="form__item">
          <label htmlFor="gender">Gender:</label>
          <div className="form__item_input">
            <select {...register("gender")}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p className="error">{errors.gender?.message}</p>
          </div>
        </div>
        <div className="form__item">
          <label htmlFor="country">Country:</label>
          <div className="form__item_input">
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  id="country"
                  {...field}
                  list="countryList"
                  {...register("country")}
                />
              )}
            />
            <datalist id="countryList">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            <p className="error">{errors.country?.message}</p>
          </div>
        </div>
        <div className="form__item">
          <label htmlFor="picture">Upload photo:</label>
          <div className="input__picture-block">
            <input
              className="input__picture"
              type="file"
              accept="image/png, image/jpeg"
              {...register("picture")}
            />
            <p className="error">{errors.picture?.message}</p>
          </div>
        </div>
        <div>
          <label className="form__checkbox">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <input
                  className="input__checkbox"
                  type="checkbox"
                  checked={field.value}
                  {...register("terms")}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <div className="agreement__block">
              <p className="agreement__text">I accept the Terms of Agreement</p>
              <p className="error">{errors.terms?.message}</p>
            </div>
          </label>
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </main>
  );
};
