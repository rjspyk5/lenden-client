import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../Hooks/useAuth";
import { useUser } from "../../Hooks/useUser";
import { useNavigate } from "react-router-dom";

// profile menu component

export function AvatarDropdown() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logout } = useAuth();
  const { userDetails } = useUser();
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const profileMenuItems = [
    {
      label: userDetails?.name || "Anonymous",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },

    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            color="blue-gray"
            className=" p-0.5"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1  backdrop-blur-xl bg-[#6e6e6e28]">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={
                isLastItem
                  ? () => {
                      logout();
                      return navigate("/login");
                    }
                  : closeMenu
              }
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
