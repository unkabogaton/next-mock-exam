import { useEffect, useReducer, createContext, useContext } from "react";

const QuestionsContext = createContext();

const initialState = {
  questions: [],
  answers: [],
};

const questionsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_QUESTIONS": {
      return {
        ...state,
        questions: [...state.questions, ...payload],
      };
    }
    case "SET_ANSWERS": {
      return {
        ...state,
        answers: payload,
      };
    }
    case "ADD_ANSWER": {
      state.answers[payload.index] = payload.point;
    }
    case "SELECT_CHOICE": {
    }
    default:
      throw new Error("No case for that type");
  }
};

const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionsReducer, initialState);
  const numberOfQuestions = state.questions.length;

  useEffect(() => {
    dispatch({
      type: "SET_ANSWERS",
      payload: Array.from({ length: numberOfQuestions }).fill(0),
    });
  }, [numberOfQuestions]);

  const addAnswer = (index, point) => {
    dispatch({
      type: "ADD_ANSWER",
      payload: {
        index,
        point,
      },
    });
  };

  const exportActions = { state, addAnswer };

  return (
    <QuestionsContext.Provider value={exportActions}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within Questions Provider");
  }
  return context;
};

export default QuestionsProvider;
