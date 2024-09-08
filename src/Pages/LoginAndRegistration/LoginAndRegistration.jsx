import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";

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
    <div className="min-h-screen  flex justify-center items-center">
      <div className="md:max-w-lg p-10 md:p-0 w-full shadow-2xl shadow-[#060407d5]  border border-blue-gray-400 rounded-lg backdrop-blur-lg">
        <Tabs
          className="bg-gradient-to-tl from-[#06071ce7] to-[#262b86]"
          value="login"
        >
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
  );
};
