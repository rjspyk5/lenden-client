import { Link } from "react-router-dom";

export const OptionCard = ({ link, name, logo }) => {
  return (
    <Link
      to={link}
      className="flex flex-col bg-[#a1a1a13f] backdrop-blur-lg rounded-md p-20 justify-center hover:outline outline-1 outline-gray-400 duration-1000 transition-all hover:cursor-pointer items-center"
    >
      <img src={logo} alt="" />
      <h1>{name}</h1>
    </Link>
  );
};
