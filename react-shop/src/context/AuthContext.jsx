import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialState } from "../reducers/authReducer";
import { AUTH_ACTIONS } from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedToken && storedUser) {
      dispatch({
        type: AUTH_ACTIONS.LOAD_USER_FROM_STORAGE,
        payload: {
          token: storedToken,
          user: storedUser,
        },
      });
    }
  }, []);

  const login = (token, user) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_REQUEST });
    try {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } catch {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: {
          error: "Wystąpił błąd podczas zapisywania danych uwierzytelniania.",
        },
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
