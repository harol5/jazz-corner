import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        code: response.data.accessToken,
        expiresIn: response.data.expiresIn,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
