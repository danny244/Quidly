/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from "..";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AccountDetails } from "../../App";

function Otp() {
  const MAX_DIGITS = 6;
  const navigate = useNavigate();
  const { handleConfirmButtonTrue } = useContext(AccountDetails);
  const [disabled, setDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },

    onSubmit: (values) => {
      console.log(values);
      navigate("/dashboard");
      handleConfirmButtonTrue();
    },

    validationSchema: yup.object({
      otp: yup.number().positive().integer().required(),
    }),
  });

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value.length <= MAX_DIGITS) {
      formik.setFieldValue("otp", value);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-fit flex items-center justify-center"
    >
      <div className="bg-tertiary shadow-shadow-color overflow-hidden h-fit border-2 border-primary max-w-[25rem] w-full rounded-[15px] ">
        <div className="w-full h-fit bg-primary">
          <div className="w-full h-fit p-[2rem] flex flex-col justify-center items-center ">
            <div
              className={`w-full mb-[1rem] hero-input-label ${
                formik.touched.otp && formik.errors.otp
                  ? "duration-500 border-b-2 transition-colors border-b-red-500 text-red-500"
                  : "focus-within:text-primary border-b-[#fff9] focus-within:border-b-primary border-b-2 transition-colors duration-500 focus-within:transition-colors focus-within:duration-500"
              }`}
            >
              <label htmlFor="otp">Enter Your OTP</label>
              <div className="w-full flex items-center group gap-2">
                <input
                  className={` ${
                    formik.touched.otp && formik.errors.otp
                      ? " placeholder:text-red-500 placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors"
                      : " placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors  "
                  } hero-input `}
                  placeholder={
                    formik.touched.otp && formik.errors.otp
                      ? formik.errors.otp
                      : "123456"
                  }
                  name="otp"
                  required
                  type="number"
                  id="otp"
                  {...formik.getFieldProps("otp")}
                  value={formik.values.otp}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button
              text={"ConFirm"}
              buttonType={"submit"}
              disabled={
                formik.values.otp.length !== MAX_DIGITS ||
                !formik.isValid ||
                !formik.dirty
              }
              onClick={() => setDisabled(true)}
            />
            <Button text={"Resend OTP"} disabled={!disabled} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Otp;
