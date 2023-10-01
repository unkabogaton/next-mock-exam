import fetchRandomQuestions from "@/apis/fetchRandomQuestions";
import generateIndexes from "@/apis/generateIndexes";

interface stateTypes {
  randomIndexes: [][];
  questions: [];
}

const useActions = (dispatch: Function, state: stateTypes) => {
  const addAnswer = (index: number, point: number) => {
    dispatch({
      type: "ADD_ANSWER",
      payload: {
        index,
        point,
      },
    });
  };

  const removeAnswer = (index: number) => {
    dispatch({
      type: "ADD_ANSWER",
      payload: {
        index,
      },
    });
  };

  const selectChoice = (questionId: number, choiceItem: string) => {
    dispatch({
      type: "SELECT_CHOICE",
      payload: {
        questionId,
        choiceItem,
      },
    });
  };

  const addQuestions = async (
    examId: string,
    category: string,
    pageId: number
  ) => {
    // const questions = fetchRandomQuestions(
    //   examId,
    //   category
    //   state.randomIndexes[pageId]
    // );
    const questions = [
      {
        itemNumber: 1,
        question: "What is the purpose of cataloging in library science?",
        choices: [
          {
            choice: "Organizing books on shelves",
            point: 0,
            isSelected: false,
          },
          {
            choice: "Providing access to library materials",
            point: 1,
            isSelected: false,
          },
          { choice: "Decorating the library", point: 0, isSelected: false },
          { choice: "Managing library staff", point: 0, isSelected: false },
        ],
      },
      {
        itemNumber: 2,
        question: "What is a bibliographic record?",
        choices: [
          { choice: "A list of library patrons", point: 0, isSelected: false },
          {
            choice: "A description of a library item",
            point: 1,
            isSelected: false,
          },
          {
            choice: "A summary of a library's budget",
            point: 0,
            isSelected: false,
          },
          {
            choice: "A report on library circulation",
            point: 0,
            isSelected: false,
          },
        ],
      },
    ];
    console.log(questions);
    dispatch({
      type: "ADD_QUESTIONS",
      payload: {
        id: pageId,
        questions,
      },
    });
  };

  const setCategory = (category: object) => {
    dispatch({
      type: "SET_CATEGORY",
      payload: {
        category,
      },
    });

    console.log(state);
  };

  return { addAnswer, selectChoice, removeAnswer, addQuestions, setCategory };
};

export default useActions;
