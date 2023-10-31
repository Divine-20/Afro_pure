"use client";
import React, { createContext, useState } from "react";
import Image from "next/image";
import AfroLogo from "../../../public/afropurelogo.png";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../components/auth/authContext";

function Login() {
  const { loginWithEmailAndPassword, loggingIn } = useAuth();
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginWithEmailAndPassword(loginInput, passwordInput);

    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full mt-36">
      <div className="rounded-lg w-1/3 bg-white shadow-lg shadow-gray-200 h-fit m-auto space-y-4 flex flex-col content-center p-10">
        <div className="flex justify-center">
          <Image src={AfroLogo} height={150} width={150} alt="logo" />
        </div>

        <form className="mt-8" onSubmit={handleLogin}>
          <div className="flex items-center w-full bg-white">
            <div className="w-[98%] mt-6">
              <input
                type="email"
                placeholder="Login"
                // value={loginInput}
                name="login"
                onChange={(e) => setLoginInput(e.target.value)}
                className={`border border-black-300/10 font-regular outline-none w-full py-[14px] px-3 rounded-md`}
              />
            </div>
          </div>

          <div className="flex items-center w-full bg-white mt-8">
            <div className="w-[98%]">
              <input
                type="password"
                name="password"
                placeholder="Password"
               
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`border border-black-300/10 font-regular outline-none w-full py-[14px] px-3 rounded-md`}
              />
            </div>
          </div>
          <button
            disabled={loggingIn}
            id="button"
            type="submit"
            className="py-3 w-full px-2 rounded-md bg-green-700 mt-4 text-white flex justify-center"
          >
            {loggingIn ? <span>Loading...</span> : <span>Log In</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
