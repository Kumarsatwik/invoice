import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface signupResponse {
  error?: string;
  message?: string;
  token?: string;
}

const useSignup = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<signupResponse | null>(null);

  const signup = async (
    fullName: string,
    email: string,
    password: string,
    cpassword: string
  ): Promise<void> => {
    setLoading(true);
    axios
      .post<signupResponse>(`${serverUrl}/signup`, {
        fullName,
        email,
        password,
        cpassword,
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
        toast.success("Signup Successfully");
        localStorage.setItem("token", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
        setLoading(false);
      });
  };
  return { signup, loading };
};

export default useSignup;
