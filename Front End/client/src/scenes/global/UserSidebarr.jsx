import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import user from "../../../src/assets/icons/person_57dp_E8EAED_FILL0_wght400_GRAD0_opsz48.svg";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Auth/authsActions"; // Adjust the import path

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.primary[500] }}
      onClick={() => {
        setSelected(title);
        if (onClick) onClick(); // Call the onClick handler if provided
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {to ? (
        <Link to={to} style={{ textDecoration: "none", color: "inherit" }} />
      ) : null}
    </MenuItem>
  );
};

const UserSidebarr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate("/login", { replace: true });
   
  };

  return (
    <Box sx={{ height: "80vh", display: "flex" }}>
      <Sidebar collapsed={isCollapsed} style={{ height: "100vh" }}>
        <Menu iconShape="square">
          {/* Sidebar Toggle Button */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.primary[400] }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="80px"
              >
                <Typography>LOGO</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User Profile */}
          {!isCollapsed && (
            <Box mb="10px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="90px"
                color="black"
              >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.primary[400]}
                  fontSize="22px"
                  sx={{
                    m: "10px 0 0 0",
                    color: "#1F2A40",
                    paddingBottom: "30px",
                  }}
                >
                  Customer
                </Typography>
              </Box>
            </Box>
          )}

          {/* Sidebar Menu */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} marginTop="50px">
            <Item
              title="Home"
              to="/user-products"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Orders"
              to="/my_orders"
              icon={<ShoppingBagOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Wishlist"
              to="/wishlist"
              icon={<FavoriteBorderOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Personal Info"
              to="/personal_info"
              icon={<PersonOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Address"
              to="/user_address"
              icon={<MyLocationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Payment Methods"
              to="/dashboard/form"
              icon={<CreditCardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Box marginTop="140px">
              <Item
                title="Log Out"
                icon={<LogoutIcon />}
                selected={selected}
                setSelected={setSelected}
                onClick={handleLogout} // Add the onClick handler for logout
              />
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default UserSidebarr;
