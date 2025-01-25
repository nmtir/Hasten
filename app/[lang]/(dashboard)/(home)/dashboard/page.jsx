import DashboardPageView from "./page-view";
import { getDictionary } from "app/dictionaries";

const Dashboard = async () => {
  const trans = await getDictionary('en');
  return <DashboardPageView trans={trans} />;
};

export default Dashboard;
