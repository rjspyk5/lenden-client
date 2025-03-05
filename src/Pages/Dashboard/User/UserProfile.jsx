import { useState } from "react";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { Fade } from "react-awesome-reveal";
import { Paper, Tabs, Tab } from "@mui/material";
import { Person, History, AccountBalanceWallet } from "@mui/icons-material";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import AccountInfo from "./AccountInfo/AccountInfo";
import RecentActivity from "./RecentActivity/RecentActivity";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Fade>
      <div className="p-4">
        <SectionHeader heading="My Profile" />
        <Paper elevation={3} className="p-6 !bg-[#76767625] text-white">
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, borderBottom: 1, borderColor: "divider" }}
          >
            <Tab icon={<Person />} label="Personal Info" />
            <Tab icon={<AccountBalanceWallet />} label="Account Info" />
            <Tab icon={<History />} label="Activity" />
          </Tabs>
          {activeTab === 0 && <PersonalInfo />}
          {activeTab === 1 && <AccountInfo />}
          {activeTab === 2 && <RecentActivity />}
        </Paper>
      </div>
    </Fade>
  );
};

export default UserProfile;
