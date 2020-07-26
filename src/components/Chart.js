import React from "react";
import * as moment from "moment";
import { Line, Bar } from "react-chartjs-2";

const Chart = ({ chartData }) => {
  const lineChart = chartData[0] ? (
    <Line
      data={{
        labels: chartData.map((stock) =>
          moment(stock.timestamp).format("l").toString()
        ),
        stacked: true,
        datasets: [
          {
            data: chartData.map((stock) => stock.low),
            label: "Low",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: chartData.map((stock) => stock.high),
            label: "High",
            borderColor: "red",
            fill: true,
          },
          {
            data: chartData.map((stock) => stock.open),
            label: "open",
            borderColor: "green",
            fill: true,
          },
          {
            data: chartData.map((stock) => stock.close),
            label: "close",
            borderColor: "blue",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  //
  const barChart = chartData.length ? (
    <Bar
      data={{
        labels: chartData.map((stock) => stock.industry),
        datasets: [
          {
            data: chartData.map((stock) => stock.low),
            label: "low",
            borderColor: "#3333ff",
            backgroundColor: "rgba(255, 0, 0, 1)",
            fill: true,
          },

          {
            data: chartData.map((stock) => stock.high),
            label: "high",
            borderColor: "green",
            backgroundColor: "rgba(0, 230, 0, 1)",
            fill: true,
          },
          {
            data: chartData.map((stock) => stock.open),
            label: "open",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",

            // fill: true,
          },
          {
            data: chartData.map((stock) => stock.close),
            label: "close",
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 200, 0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        legend: { display: true },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "EUR (€)",
              },
              ticks: {},
            },
          ],
        },
        title: {
          display: true,
          text: chartData.map((stock) => `Daily price: ${stock.timestamp}`),
        },
      }}
    />
  ) : null;

  return <div> {chartData.length === 1 ? barChart : lineChart}</div>;
};

export default Chart;
