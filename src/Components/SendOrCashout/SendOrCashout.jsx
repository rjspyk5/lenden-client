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
import { useUser } from "../../Hooks/useUser";

export const SendOrCashout = ({ methodparam }) => {
  const theme = useTheme();
  const number = useRef(null);
  const amount = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [error, seterror] = useState(null);
  const [reciverDetails, setreciverDetails] = useState(null);
  const axiosSequre = useAxiosSequre();
  const { userRole } = useUser();

  const handleConfrim = (e) => {
    e.preventDefault();
    const pin = e.target.pin.value;
    const method = methodparam;
    axiosSequre
      .post("/sendmoney", {
        ...reciverDetails,
        pin: pin,
        senderNumber: userRole.number,
        method,
      })
      // todo: success message die history teh nie jabe
      .then((res) => console.log(res.data));
  };
  const steps = [
    {
      description: <SendMoneyFrom error={error} number={number} />,
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
    const givenNumber = number?.current?.firstChild?.value;
    if (!givenNumber) {
      return seterror("Required Field");
    }
    if (!(givenNumber.length === 11)) {
      return seterror("Number must be eleven digit");
    }

    if (givenNumber === userRole.number) {
      return seterror("You can't do this operation to your own number");
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
    if (methodparam === "send_money" && result.data.role !== "user") {
      return seterror("Give a valid user number");
    }

    if (methodparam === "cash_out" && result.data.role !== "agent") {
      return seterror("Give a valid agent number");
    }

    setreciverDetails(result.data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const stepTwo = () => {
    const givenAmount = amount.current.value;
    if (givenAmount < 50) {
      return alert("give minimum 50 tk only");
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
    <div>
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
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
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
    </div>
  );
};
