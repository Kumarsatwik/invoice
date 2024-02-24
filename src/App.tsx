// App.tsx

import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useAppSelector } from "./store/store";
import AddProduct from "./pages/addProduct/AddProduct";

function App() {
  const { isLogin } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/login");
  //   }
  // }, [isLogin, navigate]);

  return (
    <div className="relative">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={isLogin ? <AddProduct /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
