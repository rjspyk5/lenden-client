import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";
import bg from "../../../public/img/bg2.jpg";
import { Fade } from "react-awesome-reveal";

export const LoginAndRegistration = () => {
  const data = [
    {
      label: "Login",
      value: "login",
      desc: <Login />,
    },
    {
      label: "Registration",
      value: "registration",
      desc: <Registration />,
    },
  ];
  return (
    <Fade>
      <div className="relative">
        <div className="absolute w-full h-full bg-black opacity-50"></div>
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="min-h-screen bg-cover flex justify-center items-center"
        >
          <div className="md:max-w-lg  bg-[#f3eeee15] p-10 md:p-0 w-full shadow-2xl shadow-[#060407d5]  border border-blue-gray-400 rounded-lg backdrop-blur-lg">
            <Tabs className=" rounded-lg   " value="login">
              <TabsHeader className="">
                {data.map(({ label, value }) => (
                  <Tab className="font-bold text-xl" key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </Fade>
  );
};
