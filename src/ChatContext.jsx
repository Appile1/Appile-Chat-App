import { createContext, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvide = ({ children }) => {
  const { user } = useContext(AuthContext);
  const INTIAL_STATE = {
    chatId: "null",
    userInfo: {},
  };
  function chatReducer(state, action) {
    if (action.type === "CHANGE_USER") {
      return {
        userInfo: action.payload,
        chatId:
          user.uid > action.payload.uid
            ? user.uid + action.payload.uid
            : action.payload.uid + user.uid,
      };
    }
  }
  const [state, dispatch] = useReducer(chatReducer, INTIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
