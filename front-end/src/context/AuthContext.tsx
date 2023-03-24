import React, { createContext, useReducer, useEffect } from "react";

interface AuthContextProps {
  userData: any | null;
  dispatch: React.Dispatch<any>;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  dispatch: () => {},
});

interface State {
  userData: any | null;
}

interface Action {
  type: any;
  payload: any;
}

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { userData: action.payload };
    case "LOGOUT":
      return { userData: null };
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userData: null,
  });

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      dispatch({ type: "LOGIN", payload: userData });
    }
  }, []);
  console.log("Authcontext: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
