import axios from "axios";

const API = axios.create({
 baseURL: "http://localhost:8000",
 headers: {
  "Content-Type": "application/json; charset=UTF-8",
 },
});
export default API;
