import { Box } from "@mui/material";
import DasshboardHeader from "../../Components/DasshboardHeader";
import PieChart from "../../Components/Charts/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <DasshboardHeader title="Pie Chart" subtitle="A Pie chart of ..." />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};
export default Pie;
