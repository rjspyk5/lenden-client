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
import { BackDropLoading } from "../Loading/BackDropLoading";

export const SendOrCashout = ({ methodparam }) => {
  const theme = useTheme();
  const [loading, setloading] = useState(false);
  const number = useRef(null);
  const amount = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [error, seterror] = useState(null);
  const [reciverDetails, setreciverDetails] = useState(null);
  const axiosSequre = useAxiosSequre();
  const { user } = useAuth();
  const { refetch } = useUser();
  const navigate = useNavigate();
  const [loadingmsz, setloadingmsz] = useState("Loading");

  const handleConfrim = async (e) => {
    e.preventDefault();

    const pin = e.target.pin.value;
    const method = methodparam;
    let msz = " Successfull";
    if (method === "cash_in") {
      msz = "request has been sent";
    }

    setloading(true);
    setloadingmsz("Processing");

    axiosSequre
      .post("/transactions", {
        ...reciverDetails,
        pin: pin,
        senderNumber: user?.number,
        method,
      })
      .then((res) => {
        if (res?.data?.result3?.insertedId) {
          refetch()
            .then(() => {
              setloading(false);
              return Swal.fire({
                icon: "success",
                text: `${methodparam.replace("_", " ")} ${msz}`,
              });
            })
            .then(() => navigate("/history"));
        } else {
          setloading(false);
          Swal.fire({
            icon: "error",
            text: res?.data?.result,
          });
        }
      })
      .catch((err) => {
        setloading(false);
        Swal.fire({
          icon: "error",
          text: `Have Server isse,try again`,
        });
      });
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
        <SendMoneyFromStepThree
          method={methodparam}
          handleConfrim={handleConfrim}
          error={error}
        />
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
    setloading(true);
    setloadingmsz("Loading");
    const result = await axiosSequre.get(`/user?emailOrNumber=${givenNumber}`);
    setloading(false);
    if (!result?.data) {
      return Swal.fire({
        icon: "error",
        text: "No account found with this number",
      });
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
        text: "Give a valid agent number",
      });
    }
    if (methodparam === "payment" && result.data.role !== "marchent") {
      return Swal.fire({
        icon: "error",
        text: "Give a valid marchent number",
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
    <div className="flex flex-col w-auto justify-center md:min-h-[500px] min-h-[400px] items-center">
      {loading && <BackDropLoading msz={loadingmsz} />}
      <div className="p-10 md:w-[500px]   w-80 bg-[#f9f9fb41]  border border-gray-300 shadow-2xl backdrop-blur shadow-[#006efffa]  rounded-lg ">
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
                  ? "bg-gradient-to-r from-blue-800 to-blue-500"
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
                  ? "bg-gradient-to-r from-blue-800 to-blue-500"
                  : "bg-blue-100"
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
