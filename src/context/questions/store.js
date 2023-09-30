import { useEffect, useReducer, createContext, useContext } from "react";
import generateIndexes from "@/apis/generateIndexes";
import useActions from "./useActions";
import { questions } from "@/data";

const QuestionsContext = createContext();

const initialState = {
  questions: questions,
  answers: [],
  page: 0,
  randomIndexes: [],
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
    case "DELETE_QUESTIONS": {
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
      return state;
    }
    case "SELECT_CHOICE": {
      const { questionId, choiceItem } = payload;
      state.questions[questionId]?.choices.forEach((choice) => {
        choice.isSelected = choice.choice === choiceItem;
      });
      console.log(state.questions);
      return {
        ...state,
        questions: state.questions,
      };
    }
    default:
      throw new Error("No case for that type");
  }
};

const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionsReducer, initialState);
  const numberOfQuestions = state.questions.length;

  const fetchRandomQuestions = () => {};

  state.randomIndexes = generateIndexes(numberOfQuestions, []);

  console.log(state.randomIndexes);

  useEffect(() => {
    dispatch({
      type: "SET_ANSWERS",
      payload: Array.from({ length: numberOfQuestions }).fill(0),
    });
  }, [numberOfQuestions]);

  const actions = useActions(dispatch, state);

  return (
    <QuestionsContext.Provider value={{ state, ...actions }}>
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
