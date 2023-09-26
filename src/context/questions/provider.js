import { QuestionsContext, initialState, useQuestions } from "./context";
import { questionsReducer } from "./reducer";
import { useReducer } from "react";

const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionsReducer, initialState);
  return (
    <QuestionsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
