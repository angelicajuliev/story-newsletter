import { DashboardData } from "@data/models/DashboardData";
import { API } from "./APIClass";
import { AxiosResponse } from "axios";

export class DashboardAPI extends API {
  public getDashboardData(): Promise<AxiosResponse<DashboardData>> {
    return this.http.get("/dashboard/");
  }
}
