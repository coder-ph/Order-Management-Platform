import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import TopBar from "../global/TopBar";
import AdminSidebar from "../global/AdminSidebar";
import Dashboard from "../../scenes/dashboard";
import Team from "../../scenes/team/Team";
import Invoices from "../../scenes/Invoices/Invoices";
import Contacts from "../../scenes/contacts/Contacts";
import AddDriver from "../../scenes/DriverForm/AddDriver";
import { Navigate, Route, Routes } from "react-router-dom";
import Calender from "../Calender/Calender";

const Ap = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="h-screen w-screen bg-[#141b2d] text-white flex">
          {/* Sidebar */}
          <div className="flex flex-col">
            <AdminSidebar />
          </div>
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <TopBar />
            <div className="flex-1 overflow-auto">
              <Routes>
                {/* Default redirect for /dashboard */}
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/main" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/form" element={<AddDriver />} />
                <Route path="/calender" element={<Calender />}/>
                {/* Add additional nested routes here as needed */}
              </Routes>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Ap;