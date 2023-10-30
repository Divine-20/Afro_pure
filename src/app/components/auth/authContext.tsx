"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { axios } from "../api-services/axios";
import { setCookie } from "cookies-next";

interface AuthContextType {
  login: string | null;
  password: string | null;
  loginWithEmailAndPassword: (login: string, password: string) => Promise<void>;
  logout: () => void;
}
type LoginProps = {
  children: ReactNode;
};

export const AuthContext = createContext<{
  initialLoading: boolean;
  loggingIn: boolean;
  loginWithEmailAndPassword: (login: string, password: string) => void;
}>({
  initialLoading: true,
  loginWithEmailAndPassword: () => {},
  loggingIn: false,
});

export const AuthProvider = ({ children }: LoginProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<{ login: string; password: string } | null>(
    null
  );
  const [initialLoading, setInitialLoading] = useState(true);
  const [loggingIn, setLogginIn] = useState(false);

  useEffect(() => {
    if (pathname === "/login") {
      setInitialLoading(false);
    }
    if (!user) {
      router.push("/login");
      setTimeout(() => {
        setInitialLoading(false);
      }, 300);
    } else {
      setInitialLoading(false);
    }
  }, [pathname]);

  const loginWithEmailAndPassword = async (
    userLogin: string,
    userPassword: string
  ) => {
    setLogginIn(true);
    try {
      const response = await axios.post("/auth/signin", {
        login: userLogin,
        password: userPassword,
      });

      console.log("response from backend : ", response);

      if (response.status === 200) {
        const userData = response.data;
        setUser({
          login: userData.login,
          password: userData.password,
        });
        setCookie("accessToken", userData.accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Logged in successfully");
        router.push("/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLogginIn(false);
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  const memoedValues = useMemo(() => {
    return {
      loginWithEmailAndPassword,
      initialLoading,
      logout,
      loggingIn,
    };
  }, [initialLoading, user, loggingIn]);

  return (
    <AuthContext.Provider value={memoedValues}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  // console.log(context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
