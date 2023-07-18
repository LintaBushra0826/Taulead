import React from "react";
import Routes from "./routes";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#660066",
        },
      }}
    >
      <Routes />
    </ConfigProvider>
  );
}

export default App;
