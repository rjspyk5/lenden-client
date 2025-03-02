import React, { useState, useEffect } from "react";
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
  Box,
  Divider,
  TextField,
  MenuItem,
  Button,
  Chip,
  Avatar,
  Pagination
} from "@mui/material";
import { 
  Send, 
  GetApp, 
  FilterList,
  Search,
  CreditCard,
  AccountBalanceWallet,
  Receipt
} from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TransactionHistory = () => {
  const { user, isLoading: userLoading } = useUser();
  const axiosSecure = useAxiosSequre();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    type: "",
    method: "",
    startDate: null,
    endDate: null,
    minAmount: "",
    maxAmount: "",
    search: ""
  });

  const fetchTransactions = async (pageNum = 1, filters = {}) => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      queryParams.append('page', pageNum);
      queryParams.append('limit', 10);
      
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.method) queryParams.append('method', filters.method);
      if (filters.startDate) queryParams.append('startDate', filters.startDate.toISOString());
      if (filters.endDate) queryParams.append('endDate', filters.endDate.toISOString());
      if (filters.minAmount) queryParams.append('minAmount', filters.minAmount);
      if (filters.maxAmount) queryParams.append('maxAmount', filters.maxAmount);
      if (filters.search) queryParams.append('search', filters.search);
      
      const response = await axiosSecure.get(`/transactions/${user.email}?${queryParams.toString()}`);
      
      setTransactions(response.data.transactions || []);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTransactions(page, filters);
    }
  }, [user, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFilters(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const applyFilters = () => {
    setPage(1); // Reset to first page when applying filters
    fetchTransactions(1, filters);
  };

  const resetFilters = () => {
    setFilters({
      type: "",
      method: "",
      startDate: null,
      endDate: null,
      minAmount: "",
      maxAmount: "",
      search: ""
    });
    setPage(1);
    fetchTransactions(1, {});
  };

  // Get transaction icon based on type and method
  const getTransactionIcon = (type, method) => {
    if (type === 'credit') {
      return <GetApp />;
    } else if (type === 'debit') {
      return <Send />;
    } else if (method === 'card') {
      return <CreditCard />;
    } else if (method === 'wallet') {
      return <AccountBalanceWallet />;
    } else {
      return <Receipt />;
    }
  };

  // Get transaction color based on type
  const getTransactionColor = (type) => {
    if (type === 'credit') return 'success.main';
    if (type === 'debit') return 'error.main';
    return 'primary.main';
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
        <SectionHeader heading="Transaction History" />
        
        <Paper elevation={3} className="p-4 mb-4">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Your Transactions</Typography>
            <Button 
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "contained" : "outlined"}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </Box>
          
          {showFilters && (
            <Box mb={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Transaction Type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    size="small"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="credit">Credit (Received)</MenuItem>
                    <MenuItem value="debit">Debit (Sent)</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Payment Method"
                    name="method"
                    value={filters.method}
                    onChange={handleFilterChange}
                    size="small"
                  >
                    <MenuItem value="">All Methods</MenuItem>
                    <MenuItem value="bank">Bank Transfer</MenuItem>
                    <MenuItem value="card">Card</MenuItem>
                    <MenuItem value="wallet">Wallet</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="Min Amount"
                    name="minAmount"
                    type="number"
                    value={filters.minAmount}
                    onChange={handleFilterChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="Max Amount"
                    name="maxAmount"
                    type="number"
                    value={filters.maxAmount}
                    onChange={handleFilterChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={filters.startDate}
                      onChange={(date) => handleDateChange('startDate', date)}
                      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={filters.endDate}
                      onChange={(date) => handleDateChange('endDate', date)}
                      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Search"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by ID, description..."
                    size="small"
                    InputProps={{
                      endAdornment: <Search />
                    }}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="outlined" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                  <Button variant="contained" onClick={applyFilters} startIcon={<Search />}>
                    Apply Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : transactions.length > 0 ? (
            <>
              {transactions.map((transaction, index) => (
                <Box key={transaction._id || index}>
                  <Grid container spacing={2} py={2} alignItems="center">
                    <Grid item xs={2} sm={1}>
                      <Avatar sx={{ bgcolor: getTransactionColor(transaction.type) }}>
                        {getTransactionIcon(transaction.type, transaction.method)}
                      </Avatar>
                    </Grid>
                    <Grid item xs={10} sm={7} md={8}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" fontWeight="medium">
                          {transaction.description || 
                            (transaction.type === 'credit' 
                              ? 'Money Received' 
                              : 'Money Sent')}
                        </Typography>
                        <Chip 
                          label={transaction.type === 'credit' ? 'Received' : 'Sent'} 
                          size="small"
                          color={transaction.type === 'credit' ? 'success' : 'error'}
                          variant="outlined"
                        />
                        {transaction.method && (
                          <Chip 
                            label={transaction.method} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.transactionId && `ID: ${transaction.transactionId} • `}
                        {new Date(transaction.date || transaction.createdAt).toLocaleString()}
                      </Typography>
                      {transaction.sender && (
                        <Typography variant="body2" color="text.secondary">
                          From: {transaction.sender}
                        </Typography>
                      )}
                      {transaction.receiver && (
                        <Typography variant="body2" color="text.secondary">
                          To: {transaction.receiver}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign="right">
                      <Typography 
                        variant="body1" 
                        fontWeight="bold"
                        color={transaction.type === 'credit' ? 'green' : 'red'}
                      >
                        {transaction.type === 'credit' ? '+' : '-'} ৳{transaction.amount?.toFixed(2) || '0.00'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.status && (
                          <Chip 
                            label={transaction.status} 
                            size="small"
                            color={
                              transaction.status === 'completed' ? 'success' :
                              transaction.status === 'pending' ? 'warning' :
                              transaction.status === 'failed' ? 'error' : 'default'
                            }
                          />
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                  {index < transactions.length - 1 && <Divider />}
                </Box>
              ))}
              
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            </>
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="body1">
                No transactions found.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Object.values(filters).some(val => val !== "" && val !== null) 
                  ? "Try changing your filters or reset them to see all transactions."
                  : "Your transaction history will appear here once you start making transactions."}
              </Typography>
            </Box>
          )}
        </Paper>
      </div>
    </Fade>
  );
};

export default TransactionHistory; 