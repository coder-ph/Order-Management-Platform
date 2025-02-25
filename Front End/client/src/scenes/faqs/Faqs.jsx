import { Box, useTheme, Typography } from "@mui/material";
import DasshboardHeader from "../../Components/DasshboardHeader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

import React from "react";

const Faqs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <DasshboardHeader title="FAQs" subtitle="Frequently Asked Questions" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon= {<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            1. How do I create an account on the platform?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To create an account, click on the <em>"Sign Up" </em>button on the
            homepage. You can register using your email address or phone number.
            Once registered, you’ll receive a verification link or code to
            activate your account. After verification, you can log in and start
            using the platform.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            2. How do I place an order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To place an order, log in to your account and navigate to the
            <em>"Create Order"</em> section. Fill out the order form with
            details such as delivery address, contact information, and items you
            want to order. You can add multiple items to a single order. Once
            completed, submit the form, and your order will be processed.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            3. How are delivery drivers assigned to orders?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Delivery drivers are assigned either automatically or manually. The
            system automatically assigns the nearest available driver to your
            order. Alternatively, an admin can manually assign a driver using
            the drag-and-drop interface on the dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            4. What payment methods are supported?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We support multiple payment methods, including
            <em>Stripe, MPESA, and cash on delivery</em>. During checkout, you
            can choose your preferred payment option. For online payments,
            you’ll be redirected to a secure payment gateway to complete the
            transaction.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            5. How can I track my order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Once your order is placed and a driver is assigned, you can track
            its status in real-time on the dashboard. The map view will show the
            driver’s current location and the estimated time of arrival. You’ll
            also receive push notifications for updates.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            6. How do I contact customer support?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you need assistance, you can reach out to our customer support
            team via the in-app chat or helpline available on the platform.
            Alternatively, you can visit the FAQ section for quick answers to
            common questions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            7. How do I view analytics and reports as an admin?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            As an admin, you can access the analytics dashboard to view key
            metrics such as orders placed, deliveries completed, and driver
            performance. The dashboard provides visual representations (e.g.,
            charts and graphs) to help you monitor and analyze platform
            performance.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Faqs;
