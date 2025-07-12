import { IconNames } from "astarva-ui";

import { route } from "./route";

const { activityApp, financeApp } = route;

interface BottomBarProps {
  path: string;
  name: string;
  icon: IconNames;
  iconActive: IconNames;
}

export const menuActivityApp: BottomBarProps[] = [
  {
    path: activityApp.home.path,
    name: activityApp.home.name,
    icon: "Home-outline",
    iconActive: "Home-solid",
  },
  // {
  //   path: activityApp.statistic.path,
  //   name: activityApp.statistic.name,
  //   icon: "Chart-outline",
  //   iconActive: "Chart-solid",
  // },
  {
    path: activityApp.category.path,
    name: activityApp.category.name,
    icon: "Grid-outline",
    iconActive: "Grid-solid",
  },
  {
    path: activityApp.activity.path,
    name: activityApp.activity.name,
    icon: "Line-Chart-outline",
    iconActive: "Line-Chart-solid",
  },
];

export const menuFinanceApp: BottomBarProps[] = [
  {
    path: financeApp.home.path,
    name: financeApp.home.name,
    icon: "Home-outline",
    iconActive: "Home-solid",
  },
  {
    path: financeApp.statistic.path,
    name: financeApp.statistic.name,
    icon: "Chart-outline",
    iconActive: "Chart-solid",
  },
  {
    path: financeApp.wallet.path,
    name: financeApp.wallet.name,
    icon: "Wallet-outline",
    iconActive: "Wallet-solid",
  },
  {
    path: financeApp.category.path,
    name: financeApp.category.name,
    icon: "Grid-outline",
    iconActive: "Grid-solid",
  },
  {
    path: financeApp.transactions.path,
    name: financeApp.transactions.name,
    icon: "Coins-outline",
    iconActive: "Coins-solid",
  },
];
