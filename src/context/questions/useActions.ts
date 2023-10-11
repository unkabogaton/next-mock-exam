import fetchRandomQuestions from "@/apis/FetchRandomQuestions";

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
    const questions = await fetchRandomQuestions(
      examId,
      category,
      state.randomIndexes[pageId]
    );
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
  };

  return { addAnswer, selectChoice, removeAnswer, addQuestions, setCategory };
};

export default useActions;
