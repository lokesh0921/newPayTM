import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow h-14 flex justify-between ">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 ml-7 mr-5">
          <div className="flex flex-col justify-center h-full text-2xl">
            {localStorage.getItem("firstname")[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full mr-4 text-2xl px-1 ">
          {localStorage.getItem("firstname")}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full mr-10">PayTM App</div>
      <div className="flex flex-col justify-center mx-2 cursor-pointer mr-11">
        <button
          className="bg-slate-600 text-white p-1.5 rounded-md mr-4 "
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("firstname");
            localStorage.removeItem("name");
            localStorage.removeItem("refreshToken");

            navigate("/signin");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
