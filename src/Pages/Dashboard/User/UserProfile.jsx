import { useState, useEffect } from "react";
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
  Button, 
  Avatar, 
  TextField,
  Box,
  Divider,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Card,
  CardContent,
  Chip,
  Switch
} from "@mui/material";
import { 
  Edit, 
  Save, 
  Cancel, 
  Person, 
  Security, 
  History, 
  Notifications, 
  AccountBalanceWallet,
  Phone,
  Email,
  LocationOn,
  Badge,
  CalendarToday,
  VerifiedUser,
  PhotoCamera
} from "@mui/icons-material";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user, refetch, isLoading } = useUser();
  const axiosSecure = useAxiosSequre();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  
  // User activity state (in a real app, fetch from backend)
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    photoURL: "",
    bio: "",
    dateOfBirth: "",
    occupation: "",
    website: ""
  });

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        photoURL: user.photoURL || "",
        bio: user.bio || "",
        dateOfBirth: user.dateOfBirth || "",
        occupation: user.occupation || "",
        website: user.website || ""
      });
      
      // Fetch user activity
      fetchUserActivity();
    }
  }, [user]);

  const fetchUserActivity = async () => {
    if (!user?.email) return;
    
    setActivityLoading(true);
    try {
      // In a real app, you would fetch from backend
      const response = await axiosSecure.get(`/users/${user._id}/activity`);
      setRecentActivity(response.data || []);
    } catch (error) {
      console.error("Error fetching user activity:", error);
      // Mock data for demonstration
      setRecentActivity([
        {
          id: 1,
          type: "login",
          description: "Logged in from Chrome on Windows",
          timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        },
        {
          id: 2,
          type: "profile_update",
          description: "Updated profile information",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        },
        {
          id: 3,
          type: "transaction",
          description: "Sent money to john@example.com",
          amount: 500,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
        }
      ]);
    } finally {
      setActivityLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Confirm before saving changes
    Swal.fire({
      title: "Save Changes?",
      text: "Are you sure you want to update your profile information?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save changes"
    }).then((result) => {
      if (result.isConfirmed) {
        // Send update request to backend
        axiosSecure.patch(`/users/${user._id}`, formData)
          .then(() => {
            setSnackbar({
              open: true,
              message: "Profile updated successfully!",
              severity: "success"
            });
            refetch(); // Refresh user data
            setEditMode(false);
          })
          .catch(err => {
            console.error("Error updating profile:", err);
            setSnackbar({
              open: true,
              message: "Failed to update profile. Please try again.",
              severity: "error"
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.displayName || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        photoURL: user.photoURL || "",
        bio: user.bio || "",
        dateOfBirth: user.dateOfBirth || "",
        occupation: user.occupation || "",
        website: user.website || ""
      });
    }
    setEditMode(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const handleUploadPhoto = () => {
    // In a real app, you would implement file upload functionality
    Swal.fire({
      title: "Upload Profile Photo",
      input: "url",
      inputLabel: "Photo URL",
      inputPlaceholder: "Enter the URL of your profile photo",
      showCancelButton: true,
      confirmButtonText: "Upload",
      showLoaderOnConfirm: true,
      preConfirm: (url) => {
        if (!url) {
          Swal.showValidationMessage("Please enter a valid URL");
          return false;
        }
        return url;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(prev => ({
          ...prev,
          photoURL: result.value
        }));
        
        // If not in edit mode, save immediately
        if (!editMode) {
          setLoading(true);
          axiosSecure.patch(`/users/${user._id}`, { photoURL: result.value })
            .then(() => {
              refetch();
              setSnackbar({
                open: true,
                message: "Profile photo updated successfully!",
                severity: "success"
              });
            })
            .catch(err => {
              console.error("Error updating profile photo:", err);
              setSnackbar({
                open: true,
                message: "Failed to update profile photo.",
                severity: "error"
              });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }
    });
  };

  if (isLoading) {
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

  const renderPersonalInfoTab = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        {/* Profile Photo Section */}
        <Grid item xs={12} md={4} textAlign="center">
          <Box position="relative" width="fit-content" margin="0 auto">
            <Avatar
              src={formData.photoURL || ""}
              alt={formData.name}
              sx={{ width: 180, height: 180, margin: "0 auto", mb: 2 }}
            />
            <IconButton 
              color="primary"
              onClick={handleUploadPhoto}
              sx={{ 
                position: 'absolute', 
                bottom: 10, 
                right: 10, 
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              <PhotoCamera />
            </IconButton>
          </Box>
          
          <Typography variant="h6" fontWeight="bold" mt={2}>
            {user?.displayName || "User"}
          </Typography>
          
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <VerifiedUser color="primary" fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              Verified Account
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" mt={1}>
            Member since: {user?.createdAt 
              ? new Date(user.createdAt).toLocaleDateString() 
              : "N/A"}
          </Typography>
          
          {!editMode && (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setEditMode(true)}
              sx={{ mt: 3 }}
            >
              Edit Profile
            </Button>
          )}
        </Grid>
        
        {/* Profile Details Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Personal Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ""}
                disabled={true}
                margin="normal"
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
                InputProps={{
                  startAdornment: <Phone color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <CalendarToday color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
                InputProps={{
                  startAdornment: <Badge color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
                multiline
                rows={3}
                placeholder="Tell us about yourself"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Address Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
                InputProps={{
                  startAdornment: <LocationOn color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={!editMode}
                margin="normal"
              />
            </Grid>
          </Grid>
          
          {editMode && (
            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<Save />}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </form>
  );

  const renderAccountInfoTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card elevation={2}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Account Information
              </Typography>
            </Box>
            <List disablePadding>
              <ListItem divider>
                <ListItemText 
                  primary="Account ID" 
                  secondary={user?._id?.substring(0, 8) || "N/A"} 
                />
              </ListItem>
              <ListItem divider>
                <ListItemText 
                  primary="Account Type" 
                  secondary={
                    <Chip 
                      label={user?.role || "Standard"} 
                      color="primary" 
                      size="small" 
                      variant="outlined" 
                    />
                  } 
                />
              </ListItem>
              <ListItem divider>
                <ListItemText 
                  primary="Account Status" 
                  secondary={
                    <Chip 
                      label={user?.status || "Active"} 
                      color="success" 
                      size="small" 
                      variant="outlined" 
                    />
                  } 
                />
              </ListItem>
              <ListItem divider>
                <ListItemText 
                  primary="Email Verification" 
                  secondary={
                    <Chip 
                      label={user?.emailVerified ? "Verified" : "Not Verified"} 
                      color={user?.emailVerified ? "success" : "warning"} 
                      size="small" 
                      variant="outlined" 
                    />
                  } 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Two-Factor Authentication" 
                  secondary={
                    <Chip 
                      label={user?.twoFactorEnabled ? "Enabled" : "Disabled"} 
                      color={user?.twoFactorEnabled ? "success" : "default"} 
                      size="small" 
                      variant="outlined" 
                    />
                  } 
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card elevation={2}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Security color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Security Settings
              </Typography>
            </Box>
            <List disablePadding>
              <ListItem divider>
                <ListItemText 
                  primary="Password" 
                  secondary="Last changed 30 days ago" 
                />
                <Button 
                  variant="outlined" 
                  size="small"
                  component="a"
                  href="/dashboard/security"
                >
                  Change
                </Button>
              </ListItem>
              <ListItem divider>
                <ListItemText 
                  primary="Recovery Email" 
                  secondary={user?.recoveryEmail || "Not set"} 
                />
                <Button 
                  variant="outlined" 
                  size="small"
                  component="a"
                  href="/dashboard/security"
                >
                  Update
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Security Questions" 
                  secondary={user?.securityQuestionsSet ? "Set" : "Not set"} 
                />
                <Button 
                  variant="outlined" 
                  size="small"
                  component="a"
                  href="/dashboard/security"
                >
                  Manage
                </Button>
              </ListItem>
            </List>
            <Box mt={2} textAlign="center">
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<Security />}
                component="a"
                href="/dashboard/security"
                fullWidth
              >
                Security Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderActivityTab = () => (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <History color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Recent Activity
          </Typography>
        </Box>
        
        {activityLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress size={30} />
          </Box>
        ) : recentActivity.length > 0 ? (
          <List>
            {recentActivity.map((activity) => (
              <ListItem key={activity.id} divider>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 
                    activity.type === 'login' ? 'primary.light' : 
                    activity.type === 'profile_update' ? 'success.light' : 
                    'warning.light' 
                  }}>
                    {activity.type === 'login' ? <Person /> : 
                     activity.type === 'profile_update' ? <Edit /> : 
                     <AccountBalanceWallet />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={activity.description}
                  secondary={new Date(activity.timestamp).toLocaleString()}
                />
                {activity.amount && (
                  <Chip 
                    label={`৳${activity.amount.toFixed(2)}`}
                    color="primary"
                    variant="outlined"
                  />
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <Box textAlign="center" py={3}>
            <Typography variant="body1" color="text.secondary">
              No recent activity found
            </Typography>
          </Box>
        )}
        
        <Box mt={2} textAlign="center">
          <Button 
            variant="outlined"
            component="a"
            href="/dashboard/transactions"
          >
            View All Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const renderNotificationsTab = () => (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Notifications color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Notification Preferences
          </Typography>
        </Box>
        
        <List>
          <ListItem divider>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText 
              primary="Email Notifications" 
              secondary="Receive important updates via email" 
            />
            <Switch 
              checked={user?.notifications?.email || false} 
              onChange={() => {
                // In a real app, update notification preferences
                Swal.fire({
                  title: "Update Notification Preferences",
                  text: "This feature will be available soon.",
                  icon: "info"
                });
              }}
            />
          </ListItem>
          <ListItem divider>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText 
              primary="SMS Notifications" 
              secondary="Receive important updates via SMS" 
            />
            <Switch 
              checked={user?.notifications?.sms || false}
              onChange={() => {
                // In a real app, update notification preferences
                Swal.fire({
                  title: "Update Notification Preferences",
                  text: "This feature will be available soon.",
                  icon: "info"
                });
              }}
            />
          </ListItem>
          <ListItem divider>
            <ListItemIcon>
              <AccountBalanceWallet />
            </ListItemIcon>
            <ListItemText 
              primary="Transaction Alerts" 
              secondary="Get notified about account transactions" 
            />
            <Switch 
              checked={user?.notifications?.transactions || true}
              onChange={() => {
                // In a real app, update notification preferences
                Swal.fire({
                  title: "Update Notification Preferences",
                  text: "This feature will be available soon.",
                  icon: "info"
                });
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText 
              primary="Security Alerts" 
              secondary="Get notified about security-related events" 
            />
            <Switch 
              checked={user?.notifications?.security || true}
              onChange={() => {
                // In a real app, update notification preferences
                Swal.fire({
                  title: "Update Notification Preferences",
                  text: "This feature will be available soon.",
                  icon: "info"
                });
              }}
            />
          </ListItem>
        </List>
        
        <Box mt={3} textAlign="center">
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              // In a real app, save notification preferences
              Swal.fire({
                title: "Save Preferences",
                text: "Your notification preferences have been saved.",
                icon: "success"
              });
            }}
          >
            Save Preferences
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Fade>
      <div className="p-4">
        <SectionHeader heading="My Profile" />
        
        <Paper elevation={3} className="p-6">
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<Person />} label="Personal Info" />
            <Tab icon={<AccountBalanceWallet />} label="Account Info" />
            <Tab icon={<History />} label="Activity" />
            <Tab icon={<Notifications />} label="Notifications" />
          </Tabs>
          
          {activeTab === 0 && renderPersonalInfoTab()}
          {activeTab === 1 && renderAccountInfoTab()}
          {activeTab === 2 && renderActivityTab()}
          {activeTab === 3 && renderNotificationsTab()}
        </Paper>
        
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </Fade>
  );
};

export default UserProfile; 