import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../store/store";
import { addLogin } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  error?: string;
  message?: string;
  token?: string;
}

const useLogin = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginResponse | null>(null);
  console.log(data);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    axios
      .post<LoginResponse>(`${serverUrl}/login`, {
        email,
        password,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        toast.success("Login Successfully");
        dispatch(addLogin({ token: res.data.token }));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };
  return { login, loading };
};

export default useLogin;
