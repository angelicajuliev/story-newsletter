import axios from "axios";

const API_URL =  'http://localhost:3004'

const instance = axios.create({
  baseURL: API_URL,
  timeout: 500000,
});

