const useActions = (dispatch: Function) => {
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

  return { addAnswer, selectChoice, removeAnswer };
};

export default useActions;
