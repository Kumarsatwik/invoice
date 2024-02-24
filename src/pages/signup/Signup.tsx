import * as React from "react";
import { useFormik } from "formik";
import { signupValidation } from "./signupValidation";
import useSignup from "../../api/useSignup";
import { useNavigate } from "react-router-dom";
interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const initialData = {
    fullName: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const { signup, loading } = useSignup();

  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialData,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      await signup(
        values.fullName,
        values.email,
        values.password,
        values.cpassword
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });
  return (
    <>
      <section className="bg-white w-full">
        <div className="flex flex-col justify-center items-center  lg:min-h-screen">
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl   rounded-lg shadow-xl p-5">
              <h1 className="text-center mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                <span className="text-blue-600">Signup</span>
              </h1>

              <form
                onSubmit={handleSubmit}
                className="mt-8 min-w-[500px]  gap-6"
              >
                <div className="my-4">
                  <label
                    htmlFor="Fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="FullName"
                    name="fullName"
                    value={values.fullName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 border"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs italic my-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="my-4">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 border"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic my-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="my-4">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 border"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic my-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="my-4">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="cpassword"
                    value={values.cpassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 border"
                  />
                  {errors.cpassword && (
                    <p className="text-red-500 text-xs italic my-1">
                      {errors.cpassword}
                    </p>
                  )}
                </div>

                <div className="sm:flex flex-col sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className={`inline-block shrink-0 rounded-md border border-blue-600 ${
                      loading
                        ? "cursor-not-allowed bg-blue-500"
                        : "bg-blue-600 cursor-pointer"
                    }  px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500`}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Create Account"}
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="/login" className="text-gray-700 underline">
                      Log in
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Signup;
