import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import TopBar from "../global/TopBar";
import AdminSidebar from "../global/AdminSidebar";
import Calender from "../../scenes/Calender/Calender"
import Team from "../../scenes/team/Team";
import Invoices from "../../scenes/Invoices/Invoices";
import Contacts from "../../scenes/contacts/Contacts";
import AddDriver from "../../scenes/DriverForm/AddDriver";
import { Navigate, Route, Routes } from "react-router-dom";

import Faqs from "../faqs/Faqs";
import Bar from "../Bar";
import Pie from "../Pie";
import Line from "../Line";
import Geog from "../Geo";
import AdDashboard from "./AdDashboard";
import AdminMap from "../../Pages/AdminMap";
import Orders from "../ManageOrders/ManageOrders";

const Ap = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="h-screen w-screen bg-[#141b2d] text-white flex">
          <div className="flex flex-col">
            <AdminSidebar />
          </div>

          <div className="flex-1 flex flex-col">
            <TopBar />
            
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />

                <Route path="/team" element={<Team />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/form" element={<AddDriver />} />
                <Route path="/calender" element={<Calender/>} />
                <Route path="/faq" element={<Faqs />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/map" element={<AdminMap />} />
                <Route path="/main" element={<AdDashboard />} />
              </Routes>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Ap;