import axios from "axios";

const client = axios.create({
  baseURL: "https://ltw-cms-stg.herokuapp.com",
  headers: {
    "content-type": "application/json",
    // CORS_ALLOW_ALL_ORIGINS: true,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": " Content-Type",
    // "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
  },
});

client.interceptors.request.use(
  async (config) => {
    const access_token = sessionStorage.getItem("access_token");
    config.headers.authorization = access_token
      ? `Bearer ${access_token}`
      : null;
    return config;
  },
  (error) => {
    console.log("error 2", error?.data?.message);
    return Promise.reject(error);
  }
);

export default client;
