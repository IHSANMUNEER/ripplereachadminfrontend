import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Navbar, Sidebar } from "components";
import { useGetUserQuery } from "state/api";

// Layout
const Layout = () => {
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  // Check if current route is the login page
  const isLoginPage = location.pathname === '/login';

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* Sidebar */}
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Conditionally render Navbar */}
      {!isLoginPage && (
        <Box flexGrow={1}>
          <Navbar
            user={data || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      )}
      {isLoginPage && <Outlet />}
    </Box>
  );
};

export default Layout;
