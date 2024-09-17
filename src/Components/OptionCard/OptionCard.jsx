import { Link } from "react-router-dom";

import CardContent from "@mui/material/CardContent";

import "./OptionCard.css";

export const OptionCard = ({ link, name, logo }) => {
  return (
    <Link to={link}>
      <CardContent className="flex space-x-3 p-10 hover:shadow-2xl hover:shadow-[#006effd8] backdrop-blur-xl bg-gradient-to-br hover:bg-gradient-to-tl from-[#090b2ee7] to-[#1c24bd]  rounded-lg border-gray-800 hover:border-gray-500 border  items-center">
        <img className="w-32" src={logo} alt="" />

        <h5 className="font-semibold text-white text-xl">{name}</h5>
      </CardContent>
    </Link>
  );
};
