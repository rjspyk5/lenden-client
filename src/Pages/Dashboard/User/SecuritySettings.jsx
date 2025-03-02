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
  Divider,
  Alert,
  Switch,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from "@mui/material";
import { 
  Security, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  PhoneAndroid,
  Email,
  History,
  Logout,
  DevicesOther,
  Check,
  Warning
} from "@mui/icons-material";
import Swal from "sweetalert2";

const SecuritySettings = () => {
  const { user, isLoading: userLoading } = useUser();
  const axiosSecure = useAxiosSequre();
  const [loading, setLoading] = useState(false);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  const [twoFactorMethod, setTwoFactorMethod] = useState(user?.twoFactorMethod || "email");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  
  // Mock login sessions (in a real app, these would come from the backend)
  const [loginSessions, setLoginSessions] = useState([
    {
      id: "session1",
      device: "Chrome on Windows",
      location: "Dhaka, Bangladesh",
      ip: "192.168.1.1",
      lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      current: true
    },
    {
      id: "session2",
      device: "Mobile App on Android",
      location: "Dhaka, Bangladesh",
      ip: "192.168.1.2",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      current: false
    }
  ]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswordForm = () => {
    let valid = true;
    const newErrors = { ...passwordErrors };
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      valid = false;
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      valid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    
    setPasswordErrors(newErrors);
    return valid;
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;
    
    setLoading(true);
    try {
      // In a real app, you would send this to your backend
      const response = await axiosSecure.post('/users/change-password', {
        userId: user._id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your password has been changed successfully",
          icon: "success",
          confirmButtonText: "OK"
        });
        
        // Reset form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        throw new Error(response.data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      
      // Handle specific errors
      if (error.response?.status === 401) {
        setPasswordErrors(prev => ({
          ...prev,
          currentPassword: "Current password is incorrect"
        }));
      } else {
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while changing your password",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    // If enabling 2FA, show verification setup
    if (!twoFactorEnabled) {
      setShowVerificationInput(true);
      
      // In a real app, you would request a verification code from the backend
      try {
        await axiosSecure.post('/users/request-verification', {
          userId: user._id,
          method: twoFactorMethod
        });
        
        Swal.fire({
          title: "Verification Code Sent",
          text: `We've sent a verification code to your ${twoFactorMethod === 'email' ? 'email address' : 'phone number'}`,
          icon: "info",
          confirmButtonText: "OK"
        });
      } catch (error) {
        console.error("Error requesting verification code:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to send verification code. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } else {
      // If disabling 2FA, confirm with user
      const result = await Swal.fire({
        title: "Disable Two-Factor Authentication?",
        text: "This will make your account less secure. Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, disable it"
      });
      
      if (result.isConfirmed) {
        setLoading(true);
        try {
          // In a real app, you would send this to your backend
          await axiosSecure.post('/users/disable-two-factor', {
            userId: user._id
          });
          
          setTwoFactorEnabled(false);
          setShowVerificationInput(false);
          
          Swal.fire({
            title: "Disabled",
            text: "Two-factor authentication has been disabled",
            icon: "success",
            confirmButtonText: "OK"
          });
        } catch (error) {
          console.error("Error disabling 2FA:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to disable two-factor authentication",
            icon: "error",
            confirmButtonText: "OK"
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleVerifyTwoFactor = async () => {
    if (!verificationCode) {
      Swal.fire({
        title: "Error",
        text: "Please enter the verification code",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
    
    setLoading(true);
    try {
      // In a real app, you would verify this with your backend
      const response = await axiosSecure.post('/users/verify-two-factor', {
        userId: user._id,
        code: verificationCode,
        method: twoFactorMethod
      });
      
      if (response.data.success) {
        setTwoFactorEnabled(true);
        setShowVerificationInput(false);
        setVerificationCode("");
        
        Swal.fire({
          title: "Enabled",
          text: "Two-factor authentication has been enabled",
          icon: "success",
          confirmButtonText: "OK"
        });
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying 2FA code:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to verify code",
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutSession = async (sessionId) => {
    const result = await Swal.fire({
      title: "End Session?",
      text: "Are you sure you want to log out this device?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log it out"
    });
    
    if (result.isConfirmed) {
      setLoading(true);
      try {
        // In a real app, you would send this to your backend
        await axiosSecure.post('/users/logout-session', {
          userId: user._id,
          sessionId: sessionId
        });
        
        // Update local state
        setLoginSessions(prev => prev.filter(session => session.id !== sessionId));
        
        Swal.fire({
          title: "Success",
          text: "Device has been logged out",
          icon: "success",
          confirmButtonText: "OK"
        });
      } catch (error) {
        console.error("Error logging out session:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to log out device",
          icon: "error",
          confirmButtonText: "OK"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogoutAllSessions = async () => {
    const result = await Swal.fire({
      title: "Log Out All Devices?",
      text: "This will log you out of all devices except this one. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out all"
    });
    
    if (result.isConfirmed) {
      setLoading(true);
      try {
        // In a real app, you would send this to your backend
        await axiosSecure.post('/users/logout-all-sessions', {
          userId: user._id,
          exceptCurrent: true
        });
        
        // Update local state
        setLoginSessions(prev => prev.filter(session => session.current));
        
        Swal.fire({
          title: "Success",
          text: "All other devices have been logged out",
          icon: "success",
          confirmButtonText: "OK"
        });
      } catch (error) {
        console.error("Error logging out all sessions:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to log out all devices",
          icon: "error",
          confirmButtonText: "OK"
        });
      } finally {
        setLoading(false);
      }
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
        <SectionHeader heading="Security Settings" />
        
        <Grid container spacing={4}>
          {/* Password Change Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="p-6">
              <Box display="flex" alignItems="center" mb={3}>
                <Lock color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Change Password
                </Typography>
              </Box>
              
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type={showPassword.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword('current')}
                        edge="end"
                      >
                        {showPassword.current ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword('new')}
                        edge="end"
                      >
                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                error={!!passwordErrors.confirmPassword}
                helperText={passwordErrors.confirmPassword}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword('confirm')}
                        edge="end"
                      >
                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChangePassword}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Lock />}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Two-Factor Authentication Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="p-6">
              <Box display="flex" alignItems="center" mb={3}>
                <Security color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Two-Factor Authentication
                </Typography>
              </Box>
              
              <Alert severity={twoFactorEnabled ? "success" : "warning"} sx={{ mb: 3 }}>
                {twoFactorEnabled 
                  ? "Two-factor authentication is enabled. Your account is secure."
                  : "Two-factor authentication is disabled. Enable it for better security."}
              </Alert>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={handleToggleTwoFactor}
                    color="primary"
                    disabled={loading || showVerificationInput}
                  />
                }
                label={twoFactorEnabled ? "Enabled" : "Disabled"}
              />
              
              {!twoFactorEnabled && (
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Select verification method:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button
                        variant={twoFactorMethod === 'email' ? "contained" : "outlined"}
                        startIcon={<Email />}
                        onClick={() => setTwoFactorMethod('email')}
                        disabled={showVerificationInput}
                      >
                        Email
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant={twoFactorMethod === 'sms' ? "contained" : "outlined"}
                        startIcon={<PhoneAndroid />}
                        onClick={() => setTwoFactorMethod('sms')}
                        disabled={showVerificationInput}
                      >
                        SMS
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {showVerificationInput && (
                <Box mt={3}>
                  <Typography variant="body2" mb={1}>
                    Enter the verification code sent to your {twoFactorMethod === 'email' ? 'email' : 'phone'}:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        label="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Enter code"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleVerifyTwoFactor}
                        disabled={loading || !verificationCode}
                        sx={{ height: '56px' }}
                      >
                        {loading ? <CircularProgress size={24} /> : "Verify"}
                      </Button>
                    </Grid>
                  </Grid>
                  <Button
                    variant="text"
                    onClick={() => setShowVerificationInput(false)}
                    sx={{ mt: 1 }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
          
          {/* Active Sessions Section */}
          <Grid item xs={12}>
            <Paper elevation={3} className="p-6">
              <Box display="flex" alignItems="center" mb={3}>
                <DevicesOther color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Active Sessions
                </Typography>
              </Box>
              
              <List>
                {loginSessions.map((session) => (
                  <ListItem key={session.id} divider>
                    <ListItemIcon>
                      {session.current ? <Check color="success" /> : <DevicesOther />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          {session.device}
                          {session.current && (
                            <Chip 
                              label="Current Device" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {session.location} • IP: {session.ip}
                          </Typography>
                          <br />
                          <Typography variant="body2" component="span" color="text.secondary">
                            Last active: {session.lastActive.toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      {!session.current && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<Logout />}
                          onClick={() => handleLogoutSession(session.id)}
                        >
                          Log Out
                        </Button>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              {loginSessions.length > 1 && (
                <Box mt={3} textAlign="right">
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Logout />}
                    onClick={handleLogoutAllSessions}
                  >
                    Log Out All Other Devices
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
        
        {/* Loading overlay */}
        <Backdrop
          sx={(theme) => ({
            color: "#fff",
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Fade>
  );
};

export default SecuritySettings; 