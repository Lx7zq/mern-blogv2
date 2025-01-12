import api from "./api";
import { Cookies, useCookies } from "react-cookie";
const API_URL = import.meta.env.VITE_BASE_URL + "/auth";

const cookies = new Cookies();
const register = async (username, password) => {
  return await api.post(API_URL + "/register", { username, password });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });

  // Save data to cookies if login is successful
  if (response.status === 200) {
    if (response.data.accessToken) {
      // Save the access token
      cookies.set("accessToken", response.data.accessToken, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000), // expires in 1 day
      });

      // Save the user data (assuming response.data contains user data)
      cookies.set("user", JSON.stringify(response.data), {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000), // expires in 1 day
      });
    }
  }
  return response;
};

const logout = () => {
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("user", { path: "/" });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
