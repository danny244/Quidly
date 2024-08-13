/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as yup from "yup";
import { dollar, flag } from "../svg";
import { PiEqualsBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { BankModal, Button, Modal } from "..";
import { BsArrowDownShort } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { emailsvg } from "../svg";
import { useContext } from "react";
import { AccountDetails } from "../../App";

const dollarRate = 803.5;
const poundsRate = 1002.46;

function Equivalent() {
  const navigate = useNavigate();
  const { setUserAccountDetails } = useContext(AccountDetails);

  // FORMIK
  const {
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    touched,
    isValid,
    dirty,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      dollars: "",
      pounds: "",
      naira: "",
      bankName: "",
      acctNumber: "",
      acctName: "",
    },

    onSubmit: (values) => {
      console.log(values);
      setUserAccountDetails(values);
      navigate("/email");
    },

    validationSchema: yup.object({
      acctNumber: yup.number().positive().integer().required(),
      bankName: yup
        .string()
        .transform((value) => value.trim())
        .required(""),
      acctName: yup
        .string()
        .transform((value) => value.trim())
        .required(""),
    }),
  });

  // CURRENCY CALCULATIONS
  const [currency, setCurrency] = useState({
    value: 1,
    equivalent: 803.5,
    currency: "USD",
    rate: dollarRate,
    image: dollar,
  });

  const handleValueChange = (e) => {
    const value = e.target.value;
    const isValidCurrency = /^\d*\.?\d{0,3}$/.test(value);

    if (isValidCurrency) {
      setCurrency({
        ...currency,
        value: value,
        equivalent: (parseFloat(value) * currency.rate).toFixed(2),
      });
    }
  };

  const handleValueChange2 = (e) => {
    const value = e.target.value;
    const isValidCurrency = /^\d*\.?\d{0,3}$/.test(value);

    if (isValidCurrency) {
      setCurrency({
        ...currency,
        value: (parseFloat(value) / currency.rate).toFixed(2),
        equivalent: value,
      });
    }
  };

  useEffect(() => {
    if (currency.currency === "GPB") {
      setFieldValue("naira", currency.equivalent);
      setFieldValue("pounds", currency.value);
      setFieldValue("dollars", "");
    } else if (currency.currency === "USD") {
      setFieldValue("dollars", currency.value);
      setFieldValue("naira", currency.equivalent);
      setFieldValue("pounds", "");
    }
  }, [currency.value, currency.equivalent, currency.currency]);

  // console.log(initialValues)

  const [openBankDetails, setOpenBankDetails] = useState(false);

  // MODALS
  const [bank, setBank] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openBankModal, setOpenBankModal] = useState(false);
  const modalRef = useRef(null);
  const bankModalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBank = () => {
      setLoading(true);
      Axios.get("https://nigerianbanks.xyz")
        .then((res) => setBank(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    fetchBank();
  }, []);

  const handleBankClick = (option) => {
    setFieldValue("bankName", option.name);
  };

  const setOpenModalToFalse = () => {
    setOpenModal(false);
  };

  const setOpenModalToTrue = () => {
    setOpenModal(true);
  };

  const setBankOpenModalToFalse = () => {
    setOpenBankModal(false);
  };

  const setBankOpenModalToTrue = () => {
    setOpenBankModal(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModalToFalse();
      }
    };

    const handleBankOutsideClick = (event) => {
      if (
        bankModalRef.current &&
        !bankModalRef.current.contains(event.target)
      ) {
        setBankOpenModalToFalse();
      }
    };

    const handleEnterPress = (event) => {
      // Check if the pressed key is Enter (key code 13)
      if (event.keyCode === 13) {
        // Programmatically click the button with the ID 'myButton'
        document.getElementById("submitButton").click();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("mousedown", handleBankOutsideClick);
    document.addEventListener("keydown", handleEnterPress);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mousedown", handleBankOutsideClick);
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  useEffect(() => {
    if (openModal || openBankModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openModal, openBankModal]);

  return (
    <>
      <BankModal
        setBankOpenModalToFalse={setBankOpenModalToFalse}
        loading={loading}
        bank={bank}
        handleBankClick={handleBankClick}
        bankModalRef={bankModalRef}
        openBankModal={openBankModal}
      />
      <Modal
        setCurrency={setCurrency}
        currency={currency}
        dollarRate={dollarRate}
        poundsRate={poundsRate}
        setOpenModalFalse={setOpenModalToFalse}
        modalRef={modalRef}
        openModal={openModal}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-tertiary shadow-shadow-color max-lg:mx-auto max-w-[30rem] lg:w-[40%] xl:w-full max-lg:w-full overflow-hidden h-fit rounded-[15px] "
      >
        <div className="w-full h-fit bg-primary">
          <header className="w-full h-[5rem] bg-secondary text-secondary flex items-center justify-between py-4 px-6">
            <div className="flea flex-col justify-between h-full w-fit">
              <h6 className="text-[0.7rem] font-bold uppercase ">
                Current Rate
              </h6>

              <div className="flex items-center text-[0.9rem] text-secondary font-semibold ">
                <h6 className="flex">1 {currency.currency}</h6>
                <PiEqualsBold className=" mx-1" />
                <h6 className="flex">{currency.rate} NGN</h6>
              </div>
            </div>

            {openBankDetails && (
              <button
                onClick={() => setOpenBankDetails(!openBankDetails)}
                className="p-[0.2rem] w-fit h-fit bg-pure rounded-[7px]"
              >
                <img src={emailsvg} className="w-[1.3rem] text-secondary" />
              </button>
            )}
          </header>

          <div className="w-full h-fit p-[2rem] gap-[2rem] flex flex-col justify-center items-center ">
            {!openBankDetails && (
              <>
                <div
                  className={`w-full hero-input-label ${
                    currency.value < 1 ||
                    (currency.value.length === 0 && currency.equivalent < 1) ||
                    currency.equivalent.length === 0
                      ? "duration-500 border-b-2 transition-colors border-b-red-500 text-red-500"
                      : "focus-within:text-primary border-b-[#fff9] focus-within:border-b-primary border-b-2 transition-colors duration-500 focus-within:transition-colors focus-within:duration-500"
                  }`}
                >
                  <label htmlFor="dollars">Enter Amount</label>

                  <div className="w-full flex items-center group gap-2">
                    <input
                      id="dollars"
                      required
                      name="dollars"
                      placeholder={
                        currency.value < 1 ||
                        (currency.value.length === 0 &&
                          currency.equivalent < 1) ||
                        currency.equivalent.length === 0
                          ? "This field is required"
                          : "Enter amount in dollars or pounds"
                      }
                      type="number"
                      value={currency.value}
                      onBlur={handleBlur}
                      onChange={handleValueChange}
                      className={`${
                        currency.value < 1 ||
                        (currency.value.length === 0 &&
                          currency.equivalent < 1) ||
                        currency.equivalent.length === 0
                          ? " placeholder:text-red-500 placeholder:transition-colors placeholder:duration-500 transform duration-1000 transition-colors"
                          : " placeholder:transition-colors placeholder:duration-1000 transform duration-500 transition-colors  "
                      } hero-input`}
                    />
                    <div
                      onClick={setOpenModalToTrue}
                      className="flex cursor-pointer justify-end items-center gap-1"
                    >
                      <img
                        src={currency.image}
                        className="rounded-full xs:h-[25px] xs:w-[25px] w-[20px] h-[20px] "
                      />
                      <h6 className="text-[#fff9] uppercase xs:text-[0.8rem] text-[0.8rem] font-normal">
                        {currency.currency}
                      </h6>
                      <div
                        className={`${
                          openModal
                            ? "rotate-180 transition-transform duration-500"
                            : "rotate-0 transition-transform duration-500"
                        } sm:w-[1.6rem] sm:h-[1.6rem] w-[1.5rem] h-[1.5rem] rounded-[8px] bg-[#2b3446] flex items-center justify-center `}
                      >
                        <BsArrowDownShort className="text-secondary md:text-[1rem] text-[0.9rem]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full focus-within:text-primary hero-input-label border-b-[#fff9] focus-within:border-b-primary border-b-2 transition-colors duration-500 focus-within:transition-colors focus-within:duration-500">
                  <label htmlFor="naira">Equivalent In Naira</label>

                  <div className="w-full flex items-center group gap-2">
                    <input
                      id="naira"
                      name="naira"
                      placeholder="Amount in naira"
                      type="number"
                      onChange={handleValueChange2}
                      value={currency.equivalent}
                      className="hero-input "
                    />

                    <div className="flex justify-end items-center gap-2">
                      <img
                        src={flag}
                        className="rounded-full xs:h-[21px] xs:w-[21px] w-[20px] h-[20px] "
                      />
                      <h6 className="text-[#fff9] xs:text-[0.9rem] text-[0.7rem] font-normal whitespace-nowrap max-xs:whitespace-break-spaces">
                        Naira (NGN)
                      </h6>
                    </div>
                  </div>
                </div>
              </>
            )}

            {openBankDetails && (
              <div className="w-full flex">
                <div className="w-full flex flex-col gap-[2rem]">
                  <div
                    className={`w-full hero-input-label ${
                      touched.bankName && errors.bankName
                        ? "duration-500 border-b-2 transition-colors border-b-red-500 text-red-500"
                        : "focus-within:text-primary border-b-[#fff9] focus-within:border-b-primary border-b-2 transition-colors duration-500 focus-within:transition-colors focus-within:duration-500"
                    }`}
                  >
                    <label htmlFor="bankName">bank name</label>

                    <div
                      onClick={setBankOpenModalToTrue}
                      className="w-full cursor-pointer flex items-center group gap-2"
                    >
                      <input
                        id="bankName"
                        required
                        placeholder={
                          touched.bankName && errors.bankName
                            ? errors.bankName
                            : "select bank"
                        }
                        name="bankName"
                        readOnly
                        value={values.bankName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        className={`w-full cursor-pointer ${
                          touched.bankName && errors.bankName
                            ? " placeholder:text-red-500 placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors"
                            : " placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors  "
                        } hero-input `}
                      />
                      <div className=" flex cursor-pointer justify-end items-center">
                        <div
                          className={`${
                            openBankModal
                              ? "rotate-180 transition-transform duration-500"
                              : "rotate-0 transition-transform duration-500"
                          } sm:w-[1.6rem] sm:h-[1.6rem] w-[1.5rem] h-[1.5rem] ml-[0.20rem] rounded-[8px] bg-[#2b3446] flex items-center justify-center `}
                        >
                          <BsArrowDownShort className="text-secondary text-[1rem]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-full hero-input-label ${
                      touched.acctNumber && errors.acctNumber
                        ? "duration-500 border-b-2 transition-colors border-b-red-500 text-red-500"
                        : "focus-within:text-primary border-b-[#fff9] focus-within:border-b-primary border-b-2 transition-colors duration-500 focus-within:transition-colors focus-within:duration-500"
                    }`}
                  >
                    <label htmlFor="acctNumber">Account number</label>

                    <div className="w-full flex items-center group gap-2">
                      <input
                        id="acctNumber"
                        placeholder={
                          touched.acctNumber && errors.acctNumber
                            ? errors.acctNumber
                            : "0349450220"
                        }
                        name="acctNumber"
                        value={values.acctNumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        className={`w-full  ${
                          touched.acctNumber && errors.acctNumber
                            ? " placeholder:text-red-500 placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors"
                            : " placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors  "
                        } hero-input `}
                      />
                    </div>
                  </div>

                  <div
                    className={`w-full hero-input-label ${
                      touched.acctName && errors.acctName
                        ? "duration-500 border-b-2 transition-colors border-b-red-500 text-red-500"
                        : "focus-within:text-primary border-b-[#fff9] focus-within:border-b-primary border-b-2 transition-colors duration-500 focus-within:transition-colors focus-within:duration-500"
                    }`}
                  >
                    <label htmlFor="acctName">account name</label>

                    <div className="w-full flex items-center gap-2">
                      <input
                        id="acctName"
                        value={values.acctName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={
                          touched.acctName && errors.acctName
                            ? errors.acctName
                            : "Jason Ademola Chinedu"
                        }
                        name="acctName"
                        type="text"
                        className={`w-full hero-input ${
                          touched.acctName && errors.acctName
                            ? " placeholder:text-red-500 placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors"
                            : " placeholder:transition-colors placeholder:duration-1000 transform duration-1000 transition-colors  "
                        } hero-input `}
                      />
                      {touched.acctName && errors.acctName
                        ? console.log("true")
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {openBankDetails ? (
              <Button
                text={"Proceed"}
                id={"submitButton"}
                buttonType={"submit"}
                disabled={!isValid || !dirty}
              />
            ) : (
              <Button
                onClick={() => setOpenBankDetails(!openBankDetails)}
                text={"Proceed"}
                id={"submitButton"}
                buttonType={""}
                disabled={
                  currency.value < 1 ||
                  (currency.value.length === 0 && currency.equivalent < 1) ||
                  currency.equivalent.length === 0
                }
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
}
export default Equivalent;
