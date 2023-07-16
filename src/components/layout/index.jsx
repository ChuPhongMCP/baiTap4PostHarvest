import Footer from "components/footer";
import Header from "components/header";
import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

const { Content } = Layout;

function Layout2() {
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header />

      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Outlet />
      </Content>

      <Footer />
    </>
  );
}

export default memo(Layout2);
