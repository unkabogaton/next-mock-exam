import { useEffect, useReducer, createContext, useContext } from "react";
import generateIndexes from "@/apis/generateIndexes";
import useActions from "./useActions";
import { questions } from "@/data";

const QuestionsContext = createContext();

const initialState = {
  questions: questions,
  answers: [],
  points: [],
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
    case "ADD_ANSWER": {
      state.answers[payload.index] = true;
      state.points[payload.index] = payload.point;
      return {
        ...state,
        answers: state.answers,
        points: state.points,
      };
    }
    case "REMOVE_ANSWER": {
      state.answers[payload.index] = false;
      state.points[payload.index] = 0;
      return {
        ...state,
        answers: state.answers,
        points: state.points,
      };
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
  state.randomIndexes = generateIndexes(98, [1]);
  state.answers = Array.from({ length: numberOfQuestions }).fill(false);
  state.points = Array.from({ length: numberOfQuestions }).fill(0);

  console.log(state.randomIndexes);

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
