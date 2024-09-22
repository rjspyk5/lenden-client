import { Link } from "react-router-dom";

import CardContent from "@mui/material/CardContent";

import "./OptionCard.css";

export const OptionCard = ({ link, name, logo }) => {
  return (
    <Link to={link}>
      <CardContent className="flex space-x-3 p-10 hover:shadow-xl hover:shadow-[#006efffa] backdrop-blur bg-[#e8e2e25f] rounded-lg border-gray-300 border  items-center">
        <img className="w-32" src={logo} alt="" />

        <h5 className="font-semibold text-white text-xl">{name}</h5>
      </CardContent>
    </Link>
  );
};
