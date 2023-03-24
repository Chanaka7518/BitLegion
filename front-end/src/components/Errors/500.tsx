import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Login from "../login/Login";
import { useLogout } from "../../Hooks/useLogout";

const InternalServerError: React.FC = () => {
  const { logout } = useLogout();
  const { userData } = useAuthContext();
  const userRole = userData?.userRole;
  const navigateTo = useNavigate();

  const backToHome = () => {
    if (userRole === "Admin") {
      logout();
      return navigateTo("/login");
    }
    navigateTo("/");
  };
  let buttonMessage;
  if (userRole === "Admin") {
    buttonMessage = "Log in";
  } else {
    buttonMessage = "Back Home";
  }
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={backToHome}>
          {buttonMessage}
        </Button>
      }
    />
  );
};

export default InternalServerError;
