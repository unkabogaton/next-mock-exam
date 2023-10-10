"use client";

import { useReducer, createContext, useContext, useEffect } from "react";
import useActions from "./useActions";
import generateIndexes from "@/apis/GenerateIndexes";

const QuestionsContext = createContext();

const initialState = {
  questions: [],
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
      console.log(payload.questions);
      const newQuestions = [
        ...state.questions.slice(0, payload.id * 10),
        ...payload.questions,
        ...state.questions.slice(10),
      ];
      return { ...state, questions: newQuestions };
    }
    case "SET_CATEGORY": {
      state.category = payload.category;
      const numberOfQuestions = state.category?.lastIndex;
      const exclusionArray = state.category?.deletedIndex;
      state.randomIndexes = generateIndexes(numberOfQuestions, exclusionArray);
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
