import { Box } from "@mui/material";
import DasshboardHeader from "../../Components/DasshboardHeader";
import GeoChart from "../../Components/Charts/GeoChart";

const Geog = () => {
  return (
    <Box m="20px">
      <DasshboardHeader title="Location Chart" subtitle="A Location chart of Delivery Spread" />
      <Box height="75vh">
        <GeoChart />
      </Box>
    </Box>
  );
};
export default Geog;
