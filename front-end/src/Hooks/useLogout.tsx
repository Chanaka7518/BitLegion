import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const history = useNavigate();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem("userData");
    history("/");
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
