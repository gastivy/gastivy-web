import { Flex, ScrollBar, Text } from "astarva-ui";
import { Bar } from "react-chartjs-2";

import { TypesTransactions } from "@/modules/financeApp/category/models";
import { SummaryCategoryTransaction } from "@/modules/financeApp/statistics/models";

interface BarChartProps {
  data: SummaryCategoryTransaction[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const incomeTypes = [TypesTransactions.INCOME, TypesTransactions.PROFIT];

  const getColor = (type: number, isHover: boolean) => {
    if (isHover) {
      return "#1c498c";
    } else {
      if (incomeTypes.includes(type)) return "#3284ff";
      return "#76adff";
    }
  };

  const chartData = data?.reduce(
    (acc, item) => {
      acc.labels.push(item.name);
      acc.moneys.push(item.money);
      if (incomeTypes.includes(item.type)) {
        acc.labelIncome.push(item.name);
        acc.moneyIncome.push(item.money);
      } else {
        acc.labelExpenses.push(item.name);
        acc.moneyExpenses.push(item.money);
      }
      acc.backgroundColor.push(getColor(item.type, false));
      acc.hoverBackgroundColor.push(getColor(item.type, true));
      return acc;
    },
    {
      labels: [] as string[],
      labelIncome: [] as string[],
      labelExpenses: [] as string[],
      moneys: [] as number[],
      moneyIncome: [] as number[],
      moneyExpenses: [] as number[],
      backgroundColor: [] as string[],
      hoverBackgroundColor: [] as string[],
    }
  );

  const AllChartData = [
    {
      title: "All Category Transaction",
      chartConfig: {
        labels: [...chartData.labels],
        datasets: [
          {
            data: [...chartData.moneys],
            backgroundColor: chartData.backgroundColor,
            hoverBackgroundColor: chartData.hoverBackgroundColor,
          },
        ],
      },
    },
    {
      title: "Income Category Transaction",
      chartConfig: {
        labels: [...chartData.labelIncome],
        datasets: [
          {
            data: [...chartData.moneyIncome],
            backgroundColor: chartData.backgroundColor,
            hoverBackgroundColor: chartData.hoverBackgroundColor,
          },
        ],
      },
    },
    {
      title: "Expenses Category Transaction",
      chartConfig: {
        labels: [...chartData.labelExpenses],
        datasets: [
          {
            data: [...chartData.moneyExpenses],
            backgroundColor: chartData.backgroundColor,
            hoverBackgroundColor: chartData.hoverBackgroundColor,
          },
        ],
      },
    },
  ];

  if (data.length === 0) return <Text>Empty</Text>;
  if (data?.length)
    return (
      <Flex flexDirection="column" gap="1rem">
        {AllChartData.map((chart, index) => {
          if (chart.chartConfig.labels.length === 0)
            return <Text key={index}>Empty</Text>;
          return (
            <ScrollBar
              overflowX="auto"
              key={index}
              padding=".75rem"
              borderRadius=".5rem"
              boxShadow="0 .25rem .5rem 0 rgba(50, 132, 255, 0.25)"
            >
              <Flex
                width={
                  chart.chartConfig.labels.length <= 3
                    ? "100%"
                    : `${chart.chartConfig.labels.length * 60}px`
                }
                hideScroll
                gap=".5rem"
                height="31.25rem"
              >
                <Bar
                  data={chart.chartConfig}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: chart.title,
                        align: "start",
                        font: {
                          size: 16,
                          weight: "bold",
                        },
                        padding: {
                          bottom: 32,
                        },
                      },
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        offset: true,
                        ticks: {
                          autoSkip: true,
                        },
                        grid: {
                          display: false,
                        },
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Flex>
            </ScrollBar>
          );
        })}
      </Flex>
    );
};
