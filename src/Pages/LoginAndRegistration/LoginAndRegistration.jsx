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
    <div className="min-h-screen flex justify-center items-center">
      <div className="md:max-w-lg p-10 md:p-0 w-full bg-[#c0c0c037] rounded-lg backdrop-blur-lg">
        <Tabs className="" value="login">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
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
