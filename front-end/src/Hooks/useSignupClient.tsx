import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface SignupResult {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: any;
}

const useSignupClient = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const history = useNavigate();

  const signup = async (
    fName: string,
    lastName: string,
    password: string,
    email: string,
    mobileNumber: string,
    gender: string
  ) => {
    setIsLoading(true);
    setError(null);

    axios
      .post("http://localhost:5001/api/signup", {
        firstName: fName,
        lastName: lastName,
        password: password,
        email: email,
        mobileNumber: mobileNumber,
        gender: gender,
      })
      .then(function (response) {
        console.log(response.data);

        // store userdata in the local storage
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: response.data.userId,
            token: response.data.token,
            email: response.data.email,
            userRole: response.data.userRole,
          })
        );

        //    // update the auth context
        dispatch({ type: "LOGIN", payload: response.data });

        response.data.message === "Registration successful"
          ? message.success(response.data.message)
          : message.error(response.data.message);

        if (
          response.data.userRole === "Client" ||
          response.data.userRole === "HeadCoach"
        ) {
          history("/");
        } else if (response.data.userRole === "Admin") {
          history("/alf-admin");
        }
        // update loading state
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return { signup, isLoading, error };
};
export default useSignupClient;
