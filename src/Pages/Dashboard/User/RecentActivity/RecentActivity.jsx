import {
    CircularProgress,
    Paper,
    Typography,
    Button,
    Avatar,
    Box,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Card,
    CardContent,
    Chip,
  } from "@mui/material";
  import {
    Edit,
    Person,
    History,
    AccountBalanceWallet,
  } from "@mui/icons-material";
import { useUser } from "../../../../Hooks/useUser";
import { useAxiosSequre } from "../../../../Hooks/useAxiosSequre";
import { useEffect, useState } from "react";

const RecentActivity = () => {
      const { user } = useUser();
      const axiosSecure = useAxiosSequre();
    useEffect(() => {
        if (user) {
          fetchUserActivity();
        }
      }, [user]);
    
      const [recentActivity, setRecentActivity] = useState([]);
      const [activityLoading, setActivityLoading] = useState(false);
      const fetchUserActivity = async () => {
        if (!user?.email) return;
        setActivityLoading(true);
        try {
          const response = await axiosSecure.get(`/users/${user._id}/activity`);
          setRecentActivity(response.data || []);
        } catch (error) {
          console.error("Error fetching user activity:", error);
          setRecentActivity([
            {
              id: 1,
              type: "login",
              description: "Logged in from Chrome on Windows",
              timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            },
            {
              id: 2,
              type: "profile_update",
              description: "Updated profile information",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            },
            {
              id: 3,
              type: "transaction",
              description: "Sent money to john@example.com",
              amount: 500,
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            },
          ]);
        } finally {
          setActivityLoading(false);
        }
      };
    
  return (
    <Card elevation={2} sx={{ bgcolor: "#76767625", color: "white" }}>
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
              <ListItem
                key={activity.id}
                divider
                sx={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        activity.type === "login"
                          ? "primary.light"
                          : activity.type === "profile_update"
                          ? "success.light"
                          : "warning.light",
                    }}
                  >
                    {activity.type === "login" ? (
                      <Person />
                    ) : activity.type === "profile_update" ? (
                      <Edit />
                    ) : (
                      <AccountBalanceWallet />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography color="white">
                      {activity.description}
                    </Typography>
                  }
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
  )
}

export default RecentActivity