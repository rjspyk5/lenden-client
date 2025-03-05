import {
  Grid,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { Security, AccountBalanceWallet } from "@mui/icons-material";
import { useUser } from "../../../../Hooks/useUser";

const AccountInfo = () => {
  const { user } = useUser();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card elevation={2} sx={{ bgcolor: "#76767625", color: "white" }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Account Information
              </Typography>
            </Box>
            <List disablePadding>
              <ListItem divider sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <ListItemText
                  primary={<Typography color="white">Account ID</Typography>}
                  secondary={
                    <Typography color="rgba(255,255,255,0.7)">
                      {user?._id?.substring(0, 8) || "N/A"}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem divider sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
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
              <ListItem divider sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <ListItemText
                  primary={
                    <Typography color="white">Account Status</Typography>
                  }
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
              <ListItem divider sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <ListItemText
                  primary={
                    <Typography color="white">Email Verification</Typography>
                  }
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
              <ListItem sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <ListItemText
                  primary={
                    <Typography color="white">
                      Two-Factor Authentication
                    </Typography>
                  }
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
        <Card elevation={2} sx={{ bgcolor: "#76767625", color: "white" }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Security color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Security Settings
              </Typography>
            </Box>
            <List disablePadding>
              <ListItem divider sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <ListItemText
                  primary={<Typography color="white">Password</Typography>}
                  secondary={
                    <Typography color="rgba(255,255,255,0.7)">
                      Last changed 30 days ago
                    </Typography>
                  }
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
              <ListItem divider sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <ListItemText
                  primary={
                    <Typography color="white">Recovery Email</Typography>
                  }
                  secondary={
                    <Typography color="rgba(255,255,255,0.7)">
                      {user?.recoveryEmail || "Not set"}
                    </Typography>
                  }
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
              <ListItem sx={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <ListItemText
                  primary={
                    <Typography color="white">Security Questions</Typography>
                  }
                  secondary={
                    <Typography color="rgba(255,255,255,0.7)">
                      {user?.securityQuestionsSet ? "Set" : "Not set"}
                    </Typography>
                  }
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
};

export default AccountInfo;
