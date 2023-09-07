import { useEffect, useState } from "react";
import Home from "./Home";
import { DashboardData } from "@data/models/DashboardData";
import { dashboardApi } from "@data/api";

const HomeC = () => {
  const [dashboardData, setDashboardData] = useState({} as DashboardData);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const results = await dashboardApi.getDashboardData();
      setDashboardData(results.data);
    } catch (error) {}
  };

  return <Home dashboardData={dashboardData} />;
};

export default HomeC;
