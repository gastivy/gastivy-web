import { Flex } from "astarva-ui";
import { TooltipItem } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

import { TypesTransactions } from "@/modules/financeApp/category/models";
import { SummaryCategoryTransaction } from "@/modules/financeApp/statistics/models";
import { formatter } from "@/utils/formatter";

interface PieChartProps {
  data: SummaryCategoryTransaction[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const getColor = (type: number, isHover: boolean) => {
    if (isHover) {
      return "#1c498c";
    } else {
      if ([TypesTransactions.INCOME, TypesTransactions.PROFIT].includes(type))
        return "#3284ff";
      return "#76adff";
    }
  };

  const chartData = data?.reduce(
    (acc, item) => {
      acc.labels.push(item.name);
      acc.moneys.push(item.money);
      acc.backgroundColor.push(getColor(item.type, false));
      acc.hoverBackgroundColor.push(getColor(item.type, true));
      return acc;
    },
    {
      labels: [] as string[],
      moneys: [] as number[],
      backgroundColor: [] as string[],
      hoverBackgroundColor: [] as string[],
    }
  );

  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.moneys,
        backgroundColor: chartData.backgroundColor,
        hoverBackgroundColor: chartData.hoverBackgroundColor,
      },
    ],
  };

  return (
    <Flex
      borderRadius=".75rem"
      boxShadow="0 .25rem .5rem 0 rgba(50, 132, 255, 0.25)"
      padding=".75rem"
    >
      <Pie
        data={chartConfig}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem: TooltipItem<"pie">) => {
                  const percentage = (
                    (Number(tooltipItem.raw) /
                      tooltipItem.dataset.data.reduce((a, b) => a + b, 0)) *
                    100
                  ).toFixed(2);
                  return `${tooltipItem.label}: ${formatter.currency(Number(tooltipItem.raw) || "")} \n\n\t ${percentage}%`;
                },
              },
            },
          },
        }}
      />
    </Flex>
  );
};

export default PieChart;
