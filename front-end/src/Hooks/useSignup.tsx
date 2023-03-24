import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useParams } from "react-router";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface SignupResult {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: any;
}

const useSignup = () => {
  const history = useNavigate();
  const { tokenByAlphalee } = useParams(); // this is extract from params to send request by identifying user
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  interface PACKAGE {
    title: string;
    rate: string;
    minOrderNumber: string;
    discount: string;
    from: string;
    to: string;
  }
  interface QUALIFICATIONS {
    urls: string;
    pdfData: any[];
  }

  const signup = async (
    // input parameters
    fName: string,
    lastName: string,
    password: string,
    address: string,
    nicNumber: string,
    gender: string,
    mobileNumber: string,
    whatsapp: string,
    landLine: string,
    email: string,
    website: string,
    athleticArchievements: string[],
    experiences: string[],
    personalTraining: PACKAGE,
    onlineCoaching: PACKAGE,
    socialAccounts: string[],
    isSubscribed: boolean,
    downloadURLs: string,
    certificateData: string
  ) => {
    setIsLoading(true);
    setError(null);

    axios
      .post(`http://localhost:5001/api/signupHeadCoach/${tokenByAlphalee}`, {
        firstName: fName,
        lastName: lastName,
        password: password,
        address: address,
        nicNumber: nicNumber,
        gender: gender,
        mobileNumber: mobileNumber,
        whatsapp: whatsapp,
        landLine: landLine,
        email: email,
        website: website,
        athleticArchievements: athleticArchievements[0],
        experiences: experiences[0],
        personalTraining: personalTraining,
        onlineCoaching: onlineCoaching,
        socialAccounts: socialAccounts,
        isSubscribed: isSubscribed,
        certificatesDownloadURLs: downloadURLs,
        certificateData: certificateData,
      })
      .then(function (response) {
        console.log(response.data);
        setTimeout(() => {
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
        }, 0);

        //    // update the auth context
        dispatch({ type: "LOGIN", payload: response.data });

        response.data.message === "Registration successfull"
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
export default useSignup;
