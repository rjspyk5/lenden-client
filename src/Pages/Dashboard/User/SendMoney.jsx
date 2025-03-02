import React, { useState } from "react";
import { useUser } from "../../../Hooks/useUser";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { Fade } from "react-awesome-reveal";
import { 
  Backdrop, 
  CircularProgress, 
  Paper, 
  Grid, 
  Typography, 
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Alert,
  InputAdornment,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import { 
  Send, 
  Person, 
  AttachMoney,
  CheckCircle,
  ArrowBack,
  ArrowForward
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const { user, balance, refetch, isLoading: userLoading } = useUser();
  const axiosSecure = useAxiosSequre();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recipientVerified, setRecipientVerified] = useState(false);
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [verifying, setVerifying] = useState(false);
  
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    note: ""
  });
  
  const [errors, setErrors] = useState({
    recipient: "",
    amount: ""
  });

  const steps = ['Recipient', 'Amount', 'Confirm'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const verifyRecipient = async () => {
    if (!formData.recipient) {
      setErrors(prev => ({
        ...prev,
        recipient: "Please enter recipient email or phone number"
      }));
      return;
    }
    
    setVerifying(true);
    try {
      const response = await axiosSecure.get(`/users/verify?identifier=${formData.recipient}`);
      if (response.data.success) {
        setRecipientInfo(response.data.user);
        setRecipientVerified(true);
        setErrors(prev => ({
          ...prev,
          recipient: ""
        }));
      } else {
        setRecipientVerified(false);
        setRecipientInfo(null);
        setErrors(prev => ({
          ...prev,
          recipient: "Recipient not found"
        }));
      }
    } catch (error) {
      console.error("Error verifying recipient:", error);
      setRecipientVerified(false);
      setRecipientInfo(null);
      setErrors(prev => ({
        ...prev,
        recipient: "Failed to verify recipient"
      }));
    } finally {
      setVerifying(false);
    }
  };

  const validateAmount = () => {
    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount)) {
      setErrors(prev => ({
        ...prev,
        amount: "Please enter a valid amount"
      }));
      return false;
    }
    
    if (amount <= 0) {
      setErrors(prev => ({
        ...prev,
        amount: "Amount must be greater than 0"
      }));
      return false;
    }
    
    if (amount > balance) {
      setErrors(prev => ({
        ...prev,
        amount: "Insufficient balance"
      }));
      return false;
    }
    
    setErrors(prev => ({
      ...prev,
      amount: ""
    }));
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!recipientVerified) {
        verifyRecipient();
        return;
      }
    } else if (activeStep === 1) {
      if (!validateAmount()) {
        return;
      }
    }
    
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Confirm with user
      const result = await Swal.fire({
        title: "Confirm Transaction",
        text: `Are you sure you want to send ৳${formData.amount} to ${recipientInfo.name || formData.recipient}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send money"
      });
      
      if (result.isConfirmed) {
        // Process transaction
        const response = await axiosSecure.post('/transactions/send', {
          sender: user.email,
          recipient: formData.recipient,
          amount: parseFloat(formData.amount),
          note: formData.note || "Money Transfer"
        });
        
        if (response.data.success) {
          await refetch(); // Refresh user data to update balance
          
          Swal.fire({
            title: "Success!",
            text: `You have successfully sent ৳${formData.amount} to ${recipientInfo.name || formData.recipient}`,
            icon: "success",
            confirmButtonText: "OK"
          });
          
          // Reset form and go to success step
          setActiveStep(3); // Success step
        } else {
          throw new Error(response.data.message || "Transaction failed");
        }
      }
    } catch (error) {
      console.error("Error sending money:", error);
      Swal.fire({
        title: "Transaction Failed",
        text: error.message || "An error occurred while processing your transaction",
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" mb={3}>
              Enter Recipient Information
            </Typography>
            
            <TextField
              fullWidth
              label="Recipient Email or Phone"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              error={!!errors.recipient}
              helperText={errors.recipient}
              disabled={verifying || recipientVerified}
              sx={{ mb: 2 }}
            />
            
            {!recipientVerified ? (
              <Button
                variant="contained"
                onClick={verifyRecipient}
                disabled={verifying || !formData.recipient}
                startIcon={verifying ? <CircularProgress size={20} /> : <Person />}
              >
                {verifying ? "Verifying..." : "Verify Recipient"}
              </Button>
            ) : (
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>Recipient Verified:</strong> {recipientInfo.name}
                </Typography>
                {recipientInfo.email && (
                  <Typography variant="body2">
                    Email: {recipientInfo.email}
                  </Typography>
                )}
                {recipientInfo.phone && (
                  <Typography variant="body2">
                    Phone: {recipientInfo.phone}
                  </Typography>
                )}
              </Alert>
            )}
            
            {recipientVerified && (
              <Button
                variant="outlined"
                onClick={() => {
                  setRecipientVerified(false);
                  setRecipientInfo(null);
                }}
                sx={{ mt: 1 }}
              >
                Change Recipient
              </Button>
            )}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" mb={3}>
              Enter Amount
            </Typography>
            
            <FormControl fullWidth error={!!errors.amount} sx={{ mb: 2 }}>
              <InputLabel htmlFor="amount-input">Amount</InputLabel>
              <OutlinedInput
                id="amount-input"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">৳</InputAdornment>}
                label="Amount"
                type="number"
              />
              {errors.amount && <FormHelperText>{errors.amount}</FormHelperText>}
            </FormControl>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              Available Balance: <strong>৳{balance?.toFixed(2) || "0.00"}</strong>
            </Alert>
            
            <TextField
              fullWidth
              label="Note (Optional)"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="What's this for?"
              multiline
              rows={2}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" mb={3}>
              Confirm Transaction
            </Typography>
            
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    From
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {user?.displayName || user?.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    To
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {recipientInfo?.name || formData.recipient}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    ৳{parseFloat(formData.amount).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Fee
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    ৳0.00
                  </Typography>
                </Grid>
                {formData.note && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Note
                    </Typography>
                    <Typography variant="body1">
                      {formData.note}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
            
            <Alert severity="warning">
              Please verify all details before confirming. This transaction cannot be reversed.
            </Alert>
          </Box>
        );
      case 3:
        return (
          <Box textAlign="center" py={4}>
            <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Transaction Successful!
            </Typography>
            <Typography variant="body1" mb={3}>
              You have successfully sent ৳{parseFloat(formData.amount).toFixed(2)} to {recipientInfo?.name || formData.recipient}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate("/dashboard/transactions")}
                >
                  View Transactions
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setActiveStep(0);
                    setFormData({
                      recipient: "",
                      amount: "",
                      note: ""
                    });
                    setRecipientVerified(false);
                    setRecipientInfo(null);
                  }}
                >
                  Send Another
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  if (userLoading) {
    return (
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#b3acac9c",
          backdropFilter: "blur(6px)",
        })}
        open={true}
      >
        <div className="flex flex-col justify-center items-center">
          <CircularProgress
            disableShrink
            size={40}
            thickness={4}
            sx={{ color: "white" }}
          />
          <h1 className="text-center mt-4 font-bold text-white text-4xl">
            Loading........
          </h1>
        </div>
      </Backdrop>
    );
  }

  return (
    <Fade>
      <div className="p-4">
        <SectionHeader heading="Send Money" />
        
        <Paper elevation={3} className="p-6">
          {activeStep < 3 && (
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          
          {getStepContent(activeStep)}
          
          {activeStep < 3 && (
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              <div>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                  >
                    {loading ? "Processing..." : "Send Money"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                    disabled={activeStep === 0 && !recipientVerified}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Box>
          )}
        </Paper>
        
        {/* Loading overlay */}
        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          })}
          open={loading}
        >
          <div className="flex flex-col justify-center items-center">
            <CircularProgress color="inherit" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Processing Transaction...
            </Typography>
          </div>
        </Backdrop>
      </div>
    </Fade>
  );
};

export default SendMoney; 