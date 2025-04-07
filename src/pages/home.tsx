import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeNewIndicator } from "../store/formSlice";

const Home = () => {
  const forms = useSelector((state: RootState) => state.form.forms);
  const dispatch = useDispatch();

  useEffect(() => {
    if (forms.some((form) => form.isNew)) {
      const timer = setTimeout(() => {
        forms.forEach((form) => {
          if (form.isNew) {
            dispatch(removeNewIndicator(form.id));
          }
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [dispatch, forms]);

  return (
    <>
      <main className="main">
        <div className="submitted-data">
          {forms.length > 0 ? (
            forms.map((formData, index) => (
              <div
                className={`submitted-data__item ${formData.isNew ? "highlight" : ""}`}
                key={formData.id}
              >
                <h2>Form Data {index + 1}</h2>
                <div className="submitted-data__text">
                  <span>Name:</span> {formData.name}
                </div>
                <div className="submitted-data__text">
                  <span>Age:</span> {formData.age}
                </div>
                <div className="submitted-data__text">
                  <span>Email:</span> {formData.email}
                </div>
                <div className="submitted-data__text">
                  <span>Password:</span> {formData.password}
                </div>
                <div className="submitted-data__text">
                  <span>Confirmed password:</span> {formData.password}
                </div>
                <div className="submitted-data__text">
                  <span>Gender:</span> {formData.gender}
                </div>
                <div className="submitted-data__text">
                  <span>Country:</span> {formData.country}
                </div>
                {formData.picture && (
                  <div className="submitted-data__preview submitted-data__text">
                    <span>Picture: </span>
                    <img
                      src={formData.picture}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  </div>
                )}
                <div className="submitted-data__text">
                  <span>Terms:</span> {formData.terms ? "Accepted" : "Not accepted"}
                </div>
              </div>
            ))
          ) : (
            <p>No submitted forms</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
