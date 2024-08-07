import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useRef, useState } from "react";
import { useAxiosSequre } from "./../../Hooks/useAxiosSequre";
import {
  SendMoneyFrom,
  SendMoneyFromStepThree,
  SendMoneyFromStepTwo,
} from "../SendMoneyForm/SendMoneyForm";
import { useAuth } from "../../Hooks/useAuth";
import { useUser } from "./../../Hooks/useUser";

export default function Stepper() {
  const theme = useTheme();
  const number = useRef(null);
  const amount = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [error, seterror] = useState(null);
  const [reciverDetails, setreciverDetails] = useState(null);
  const axiosSequre = useAxiosSequre();
  const { userRole } = useUser();
  console.log(userRole);
  const handleConfrim = (e) => {
    e.preventDefault();
    const pin = e.target.pin.value;
    const method = "send_money";
    axiosSequre
      .post("/sendmoney", {
        ...reciverDetails,
        pin: pin,
        senderNumber: userRole.number,
        method,
      })
      .then((res) => console.log(res.data));
  };

  const steps = [
    {
      description: <SendMoneyFrom error={error} number={number} />,
    },
    {
      description: <SendMoneyFromStepTwo amount={amount} />,
    },
    {
      description: (
        <SendMoneyFromStepThree handleConfrim={handleConfrim} error={error} />
      ),
    },
  ];

  const maxSteps = steps.length;

  const handleNext = async () => {
    if (activeStep === 0) {
      const givenNumber = number?.current?.firstChild?.value;
      if (!givenNumber) {
        return seterror("Required Field");
      }
      if (!(givenNumber.length === 11)) {
        return seterror("Number must be eleven digit");
      }
      if (givenNumber.length === 11) {
        seterror(null);
      }
      const result = await axiosSequre.get(
        `/checkrole?emailOrNumber=${givenNumber}`
      );
      if (!result.data) {
        return seterror("No account found with this number");
      }
      if (
        result.data.role !== "user" ||
        result.data?.accountStatus === "pending"
      ) {
        return seterror("You can send money to an user only");
      }
      if (result.data.role === "user") {
        setreciverDetails(result.data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if (activeStep === 1) {
      const givenAmount = amount.current.value;
      if (givenAmount < 50) {
        return alert("give minimum 50 tk only");
      }

      setreciverDetails({ ...reciverDetails, amount: givenAmount });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 2) {
      console.log("unknown");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>
      <Box sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        {steps[activeStep].description}
      </Box>
      <MobileStepper
        variant="progress"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
