import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

const options = {
  legend: {
    display: false, // label 숨기기
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 70, // 최소
          stepSize: 5,
        },
      },
    ],
  },
  maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
};

// const Graph = ({ correctAnswerRate, versionList }) => {
//   let rankColor = ["#11b288", "#207ac7", "tomato"];

//   const data = {
//     labels: versionList,
//     datasets: [
//       {
//         backgroundColor: rankColor,
//         borderColor: rankColor,
//         borderWidth: 1,
//         hoverBackgroundColor: rankColor,
//         hoverBorderColor: rankColor,
//         data: correctAnswerRate,
//       },
//     ],
//   };

//   return <Bar data={data} width={300} height={200} options={options} />;
// };

const Graph = ({ correctAnswerRate, versionList }) => {
  const rankColor = [
    "#11b288",
    "#207ac7",
    "tomato",
    "blue",
    "green",
    "green",
    "green",
    "green",
    "green",
    "green",
    "green",
  ];

  const data = {
    labels: versionList,
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: rankColor,
        borderWidth: 3,
        hoverBackgroundColor: rankColor,
        hoverBorderColor: rankColor,
        data: correctAnswerRate,
      },
    ],
  };

  return <Line data={data} width={300} height={200} options={options} />;
};

Graph.propTypes = {
  correctAnswerRate: PropTypes.array.isRequired,
  versionList: PropTypes.array.isRequired,
};

export default Graph;
