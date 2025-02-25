import { Box } from "@mui/material";
import DasshboardHeader from "../../Components/DasshboardHeader";
import LineChart from "../../Components/Charts/LineChart";

const Line = () => {
  return (
    <Box m="20px">
      <DasshboardHeader title="Pie Chart" subtitle="A Line chart of ..." />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};
export default Line;
