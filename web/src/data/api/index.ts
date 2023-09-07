import axios from "axios";
import RecipientAPI from "./RecipientAPI";
import NewsletterAPI from "./NewsletterAPI";
import { CategoryAPI } from "./CategoryAPI";
import { DashboardAPI } from "./DashboardAPI";

export const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 500000,
});

export const recipientApi = new RecipientAPI(instance);
export const newsletterApi = new NewsletterAPI(instance);
export const categoryApi = new CategoryAPI(instance);
export const dashboardApi = new DashboardAPI(instance);
