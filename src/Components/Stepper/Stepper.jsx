import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { Input, Typography } from "@material-tailwind/react";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { SendMoneyFrom } from "../SendMoneyForm/SendMoneyForm";
import { useRef, useState } from "react";

export default function Stepper() {
  const theme = useTheme();
  const number = useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [error, seterror] = useState(null);
  const [numberr, setnumberr] = useState();

  const steps = [
    {
      description: (
        <div>
          <Typography variant="h4" className="text-center" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 text-center font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email or Number <span className="text-red-500">*</span>
            </Typography>
            <Input
              name="number"
              ref={number}
              value={numberr}
              onChange={(e) => setnumberr(e.target.value)}
              size="lg"
              placeholder="Enter your email or number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {error && <h1>{error}</h1>}
          </div>
        </div>
      ),
    },
    {
      label: "Create an ad group",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  const maxSteps = steps.length;

  const handleNext = () => {
    const givenNumber = number?.current?.firstChild?.value;
    console.log(givenNumber);
    if (!(givenNumber.length === 11)) {
      return seterror("Number must be eleven digit");
    }
    if (givenNumber.length === 11) {
      seterror(null);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
