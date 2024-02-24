// App.tsx

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useAppSelector } from "./store/store";
import AddProduct from "./pages/addProduct/AddProduct";

function App() {
  const { isLogin, token } = useAppSelector((state) => state.auth); // Use useSelector
  const navigate = useNavigate();

  console.log(isLogin, token);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <div className="relative">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AddProduct />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
