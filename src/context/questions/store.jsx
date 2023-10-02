"use client";

import { useReducer, createContext, useContext } from "react";
import useActions from "./useActions";
import { questions } from "@/data";
import generateIndexes from "@/apis/generateIndexes";

const QuestionsContext = createContext();

const initialState = {
  questions: questions,
  answers: [],
  points: [],
  page: 0,
  randomIndexes: [],
  category: {},
};

const questionsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
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
      return {
        ...state,
        questions: state.questions,
      };
    }
    case "ADD_QUESTIONS": {
      state.questions.splice(payload.id + 1 * 10, 10, ...payload.questions);
      return {
        ...state,
        questions: state.questions,
      };
    }
    case "SET_CATEGORY": {
      state.category = payload.category;
      const numberOfQuestions = state.category?.lastIndex;
      const exclusionArray = state.category?.deletedIndex;
      state.randomIndexes = generateIndexes(numberOfQuestions, exclusionArray);
      state.answers = Array.from({ length: numberOfQuestions }).fill(false);
      state.points = Array.from({ length: numberOfQuestions }).fill(0);
      return state;
    }
    default:
      throw new Error("No case for that type");
  }
};

const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionsReducer, initialState);

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
