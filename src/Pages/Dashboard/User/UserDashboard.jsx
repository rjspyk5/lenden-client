import React, { useState, useEffect } from "react";
import { useUser } from "../../../Hooks/useUser";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { Fade } from "react-awesome-reveal";
import { Backdrop, CircularProgress, Paper, Grid, Typography, Button, Avatar, Box, Divider } from "@mui/material";
import { 
  AccountBalanceWallet, 
  Send, 
  GetApp, 
  History, 
  Security, 
  Person, 
  CreditCard,
  Notifications
} from "@mui/icons-material";

const UserDashboard = () => {
  const { user, balance, refetch, isLoading } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const axiosSecure = useAxiosSequre();

  useEffect(() => {
    // Fetch recent transactions
    if (user?.email) {
      setTransactionsLoading(true);
      axiosSecure.get(`/transactions/${user.email}?limit=5`)
        .then(res => {
          setTransactions(res.data);
          setTransactionsLoading(false);
        })
        .catch(err => {
          console.error("Error fetching transactions:", err);
          setTransactionsLoading(false);
        });
    }
  }, [user, axiosSecure]);

  // Quick action buttons
  const quickActions = [
    { icon: <Send />, label: "Send Money", path: "/dashboard/send-money" },
    { icon: <GetApp />, label: "Cash Out", path: "/dashboard/cash-out" },
    { icon: <CreditCard />, label: "Add Money", path: "/dashboard/add-money" },
    { icon: <History />, label: "History", path: "/dashboard/transactions" },
  ];

  // Dashboard menu items
  const menuItems = [
    { icon: <Person />, label: "My Profile", path: "/dashboard/profile" },
    { icon: <Security />, label: "Security", path: "/dashboard/security" },
    { icon: <Notifications />, label: "Notifications", path: "/dashboard/notifications" },
    { icon: <AccountBalanceWallet />, label: "Payment Methods", path: "/dashboard/payment-methods" },
  ];

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

  return (
    <Fade>
      <div className="p-4">
        <SectionHeader heading="My Dashboard" />
        
        {/* User Profile Summary */}
        <Paper elevation={3} className="p-6 mb-6">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={2}>
              <Avatar
                src={user?.photoURL || ""}
                alt={user?.displayName}
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" fontWeight="bold">
                {user?.displayName || "User"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Account ID: {user?._id?.substring(0, 8) || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} textAlign="center">
              <Paper elevation={2} className="p-4 bg-blue-50">
                <Typography variant="body2" color="text.secondary">
                  Available Balance
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  ৳ {balance?.toFixed(2) || "0.00"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Quick Actions */}
        <Typography variant="h6" fontWeight="bold" className="mb-3">
          Quick Actions
        </Typography>
        <Grid container spacing={2} className="mb-6">
          {quickActions.map((action, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Button
                variant="outlined"
                fullWidth
                component="a"
                href={action.path}
                startIcon={action.icon}
                sx={{
                  padding: "16px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  height: "100px",
                  borderRadius: "8px",
                  "& .MuiButton-startIcon": {
                    margin: 0,
                    fontSize: "2rem",
                  },
                }}
              >
                <Box sx={{ mt: 1 }}>{action.label}</Box>
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* Recent Transactions */}
        <Typography variant="h6" fontWeight="bold" className="mb-3">
          Recent Transactions
        </Typography>
        <Paper elevation={2} className="p-4 mb-6">
          {transactionsLoading ? (
            <div className="text-center p-4">
              <CircularProgress size={30} />
            </div>
          ) : transactions.length > 0 ? (
            <div>
              {transactions.map((transaction, index) => (
                <div key={index}>
                  <Grid container spacing={2} className="py-2">
                    <Grid item xs={2} sm={1}>
                      <Avatar sx={{ bgcolor: transaction.type === 'credit' ? 'green' : 'red' }}>
                        {transaction.type === 'credit' ? <GetApp /> : <Send />}
                      </Avatar>
                    </Grid>
                    <Grid item xs={7} sm={8}>
                      <Typography variant="body1" fontWeight="medium">
                        {transaction.description || (transaction.type === 'credit' ? 'Money Received' : 'Money Sent')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(transaction.date).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} textAlign="right">
                      <Typography 
                        variant="body1" 
                        fontWeight="bold"
                        color={transaction.type === 'credit' ? 'green' : 'red'}
                      >
                        {transaction.type === 'credit' ? '+' : '-'} ৳{transaction.amount.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  {index < transactions.length - 1 && <Divider />}
                </div>
              ))}
              <Box textAlign="center" mt={2}>
                <Button 
                  variant="text" 
                  component="a" 
                  href="/dashboard/transactions"
                >
                  View All Transactions
                </Button>
              </Box>
            </div>
          ) : (
            <Typography variant="body1" textAlign="center" className="py-4">
              No recent transactions found.
            </Typography>
          )}
        </Paper>

        {/* Dashboard Menu */}
        <Typography variant="h6" fontWeight="bold" className="mb-3">
          Dashboard Menu
        </Typography>
        <Grid container spacing={2}>
          {menuItems.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Paper 
                elevation={2} 
                component="a" 
                href={item.path}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  padding: '20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.light', mb: 2 }}>
                  {item.icon}
                </Avatar>
                <Typography variant="body1" fontWeight="medium">
                  {item.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Fade>
  );
};

export default UserDashboard; 