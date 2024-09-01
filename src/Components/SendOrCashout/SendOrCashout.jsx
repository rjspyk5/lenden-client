import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import {
  SendMoneyFrom,
  SendMoneyFromStepThree,
  SendMoneyFromStepTwo,
} from "./SendMoneyForm";
import { Box, MobileStepper, Paper } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useAxiosSequre } from "../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";
import { useAuth } from "../../Hooks/useAuth";
import { useUser } from "./../../Hooks/useUser";
import { useNavigate } from "react-router-dom";

export const SendOrCashout = ({ methodparam }) => {
  const theme = useTheme();
  const number = useRef(null);
  const amount = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [error, seterror] = useState(null);
  const [reciverDetails, setreciverDetails] = useState(null);
  const axiosSequre = useAxiosSequre();
  const { user } = useAuth();
  const { refetch } = useUser();
  const navigate = useNavigate();

  const handleConfrim = async (e) => {
    e.preventDefault();

    const pin = e.target.pin.value;
    const method = methodparam;
    let msz = " request has been sent";
    if (method === "send_money") {
      msz = "Successfull";
    }

    axiosSequre
      .post("/sendmoney", {
        ...reciverDetails,
        pin: pin,
        senderNumber: user?.number,
        method,
      })
      .then((res) => {
        if (res?.data?.result3?.insertedId) {
          refetch()
            .then(() =>
              Swal.fire({
                icon: "success",
                text: `${methodparam.toUpperCase()} ${msz}`,
              })
            )
            .then(() => navigate("/history"));
        } else {
          Swal.fire({
            icon: "error",
            text: `Wrong Password`,
          });
        }
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          text: `Have Server isse,try again`,
        })
      );

    // todo: success message die history teh nie jabe
  };
  const steps = [
    {
      description: (
        <SendMoneyFrom name={methodparam} error={error} number={number} />
      ),
    },
    {
      description: (
        <SendMoneyFromStepTwo reciverDetails={reciverDetails} amount={amount} />
      ),
    },
    {
      description: (
        <SendMoneyFromStepThree handleConfrim={handleConfrim} error={error} />
      ),
    },
  ];
  const maxSteps = steps.length;

  const firstStep = async () => {
    const givenNumber = number?.current?.value;

    if (!givenNumber) {
      return seterror("Required Field");
    }
    if (!(givenNumber.length === 11)) {
      return seterror("Number must be eleven digit");
    }

    if (givenNumber === user?.number) {
      return seterror("You can't do this operation to your own number");
    }
    if (givenNumber.length === 11) {
      seterror(null);
    }
    const result = await axiosSequre.get(`/user?emailOrNumber=${givenNumber}`);
    if (!result?.data) {
      return Swal.fire({
        icon: "error",
        text: "No account found with this number",
      });
      // seterror("No account found with this number");
    }
    if (methodparam === "send_money" && result.data.role !== "user") {
      return Swal.fire({
        icon: "error",
        text: "Give a valid user number",
      });
    }

    if (
      (methodparam === "cash_out" || methodparam === "cash_in") &&
      result.data.role !== "agent"
    ) {
      return Swal.fire({
        icon: "error",
        text: "Give a valid user agent number",
      });
    }

    setreciverDetails(result.data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const stepTwo = () => {
    const givenAmount = amount.current.value;

    if (givenAmount < 50) {
      return Swal.fire("Less than 50 tk transcition not allowed");
    }
    setreciverDetails({ ...reciverDetails, amount: givenAmount });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      firstStep();
    }
    if (activeStep === 1) {
      stepTwo();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="flex flex-col w-auto justify-center min-h-[450px] items-center">
      <div className="p-10 md:w-[500px] w-96 bg-gradient-to-tl from-[#140918] to-[#4c205c] rounded-lg border-gray-800">
        {steps[activeStep].description}
        <MobileStepper
          sx={{ bgcolor: "transparent", marginTop: "40px" }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <button
              className={`${
                activeStep !== maxSteps - 1
                  ? "bg-gradient-to-r from-purple-800 to-purple-500"
                  : "opacity-0"
              }  px-2 py-1  rounded-md flex justify-center items-center text-white`}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </button>
          }
          backButton={
            <button
              className={`${
                activeStep !== 0
                  ? "bg-gradient-to-r from-purple-800 to-purple-500"
                  : "bg-purple-100"
              }  px-2 py-1  rounded-md flex justify-center items-center text-white`}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </button>
          }
        />
      </div>
    </div>
  );
};
