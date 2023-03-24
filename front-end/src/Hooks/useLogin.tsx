import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { message, Spin } from "antd";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  // const [token, setToken] = useState<boolean>(false);
  // const [userId, setUserId] = useState<boolean>(false);
  // const [email, setEmail] = useState<string>("");
  // const [userRole, setUserRole] = useState<string>("");

  const history = useNavigate();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    axios
      .post("http://localhost:5001/api/login", {
        email: email,
        password: password,
      })
      .then(function (response: any) {
        // save the user to local storage
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: response.data.userId,
            token: response.data.token,
            email: response.data.email,
            userRole: response.data.userRole,
          })
        );

        if (response.data.message === "Login success") {
          message.success(response.data.message);
          setIsLoading(false);
        } else {
          message.error(response.data.message);
          setIsLoading(false);
        }

        if (
          response.data.userRole === "Client" ||
          response.data.userRole === "HeadCoach"
        ) {
          history("/");
        } else if (response.data.userRole === "Admin") {
          history("/alf-admin");
        }

        // update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
        // update loading state
      })
      .catch(function (error: any) {
        console.log(error.message);
        message.error(error.message);
      });
  };

  return { login, isLoading, error };
};
