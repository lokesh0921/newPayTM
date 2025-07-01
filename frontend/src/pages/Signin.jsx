// import { BottomWarning } from "../components/BottomWarning"
// import { Button } from "../components/Button"
// import { Heading } from "../components/Heading"
// import { InputBox } from "../components/InputBox"
// import { SubHeading } from "../components/SubHeading"

import axios from "axios";
import Button from "../components/Button";
import BottomWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="john@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="john"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:5001/api/v1/user/signin",
                  { username: userName, password: password }
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("firstname", firstName);

                navigate("/dashboard");
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
