import fetchRandomQuestions from "@/apis/fetchRandomQuestions";

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

  const addQuestions = (examId: string, category: string, pageId: number) => {
    if (state.questions[pageId * 10]) return;
    const questions = fetchRandomQuestions(
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

  return { addAnswer, selectChoice, removeAnswer, addQuestions };
};

export default useActions;
