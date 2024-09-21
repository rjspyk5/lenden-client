import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="btn ml-10 mt-10 px-2 py-1 bg-[blue] rounded-md text-white"
      >
        Go Back
      </button>
      <div className=" flex justify-center items-center">
        <h1 className="font-bold text-2xl mt-48">
          This page is under Constraction
        </h1>
      </div>
    </div>
  );
};
