import React from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";

// const data = {
//   labels: ["긍정", "부정"],
//   datasets: [
//     {
//       data: [300, 50],
//       backgroundColor: ["#70F170", "#FF7F50"],
//       hoverBackgroundColor: ["#70F170", "#FF7F50"],
//     },
//   ],
// };

const PieChart = ({
  labels,
  data,
  backgroundColor = ["#70F170", "#FF7F50"],
  hoverBackgroundColor = ["#70F170", "#FF7F50"],
}) => {
  return (
    <Pie
      data={{
        labels,
        datasets: [{ data, backgroundColor, hoverBackgroundColor }],
      }}
    />
  );
};

PieChart.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  backgroundColor: PropTypes.array,
  hoverBackgroundColor: PropTypes.array,
};

export default PieChart;
