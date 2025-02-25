import { Box } from "@mui/material";
import DasshboardHeader from "../../Components/DasshboardHeader";
import BarChart from "../../Components/Charts/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <DasshboardHeader title="Bar Chart" subtitle="A bar chart of ..." />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};
export default Bar;
