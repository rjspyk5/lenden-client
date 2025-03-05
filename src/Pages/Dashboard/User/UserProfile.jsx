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
import PersonalInfo from "./PersonalInfo/PersonalInfo";

const UserProfile = () => {
  const { user,  } = useUser();
  const axiosSecure = useAxiosSequre();
  const [activeTab, setActiveTab] = useState(0);
  // User activity state (in a real app, fetch from backend)
  const [recentActivity, setRecentActivity] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  
 

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user) {
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

  const renderAccountInfoTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card elevation={2} sx={{ bgcolor: '#76767625', color: 'white' }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Account Information
              </Typography>
            </Box>
            <List disablePadding>
              <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Account ID</Typography>}
                  secondary={<Typography color="rgba(255,255,255,0.7)">{user?._id?.substring(0, 8) || "N/A"}</Typography>}
                />
              </ListItem>
              <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Account Type</Typography>}
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
              <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Account Status</Typography>}
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
              <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Email Verification</Typography>}
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
              <ListItem sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Two-Factor Authentication</Typography>}
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
        <Card elevation={2} sx={{ bgcolor: '#76767625', color: 'white' }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Security color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Security Settings
              </Typography>
            </Box>
            <List disablePadding>
              <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Password</Typography>}
                  secondary={<Typography color="rgba(255,255,255,0.7)">Last changed 30 days ago</Typography>}
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
              <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Recovery Email</Typography>}
                  secondary={<Typography color="rgba(255,255,255,0.7)">{user?.recoveryEmail || "Not set"}</Typography>}
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
              <ListItem sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <ListItemText 
                  primary={<Typography color="white">Security Questions</Typography>}
                  secondary={<Typography color="rgba(255,255,255,0.7)">{user?.securityQuestionsSet ? "Set" : "Not set"}</Typography>}
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
    <Card elevation={2} sx={{ bgcolor: '#76767625', color: 'white' }}>
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
              <ListItem key={activity.id} divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
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
                  primary={<Typography color="white">{activity.description}</Typography>}
                  secondary={
                    <Typography color="rgba(255,255,255,0.7)">
                      {new Date(activity.timestamp).toLocaleString()}
                    </Typography>
                  }
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
    <Card elevation={2} sx={{ bgcolor: '#76767625', color: 'white' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Notifications color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Notification Preferences
          </Typography>
        </Box>
        
        <List>
          <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <Email />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography color="white">Email Notifications</Typography>}
              secondary={
                <Typography color="rgba(255,255,255,0.7)">
                  Receive important updates via email
                </Typography>
              }
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
              sx={{
                '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.3)' },
                '& .MuiSwitch-thumb': { backgroundColor: 'white' }
              }}
            />
          </ListItem>
          <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <Phone />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography color="white">SMS Notifications</Typography>}
              secondary={
                <Typography color="rgba(255,255,255,0.7)">
                  Receive important updates via SMS
                </Typography>
              }
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
              sx={{
                '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.3)' },
                '& .MuiSwitch-thumb': { backgroundColor: 'white' }
              }}
            />
          </ListItem>
          <ListItem divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <AccountBalanceWallet />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography color="white">Transaction Alerts</Typography>}
              secondary={
                <Typography color="rgba(255,255,255,0.7)">
                  Get notified about account transactions
                </Typography>
              }
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
              sx={{
                '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.3)' },
                '& .MuiSwitch-thumb': { backgroundColor: 'white' }
              }}
            />
          </ListItem>
          <ListItem sx={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            <ListItemIcon sx={{ color: 'white' }}>
              <Security />
            </ListItemIcon>
            <ListItemText 
              primary={<Typography color="white">Security Alerts</Typography>}
              secondary={
                <Typography color="rgba(255,255,255,0.7)">
                  Get notified about security-related events
                </Typography>
              }
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
              sx={{
                '& .MuiSwitch-track': { backgroundColor: 'rgba(255,255,255,0.3)' },
                '& .MuiSwitch-thumb': { backgroundColor: 'white' }
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
        <Paper  elevation={3} className="p-6 !bg-[#76767625] text-white">
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, borderBottom: 1, borderColor: 'divider', }}
          >
            <Tab icon={<Person />} label="Personal Info" />
            <Tab icon={<AccountBalanceWallet />} label="Account Info" />
            <Tab icon={<History />} label="Activity" />
            <Tab icon={<Notifications />} label="Notifications" />
          </Tabs>         
          {activeTab === 0 && <PersonalInfo/>}
          {activeTab === 1 && renderAccountInfoTab()}
          {activeTab === 2 && renderActivityTab()}
          {activeTab === 3 && renderNotificationsTab()}
        </Paper>
      </div>
    </Fade>
  );
};

export default UserProfile; 