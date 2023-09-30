const useActions = (dispatch, state) => {
  const addAnswer = (index, point) => {
    dispatch({
      type: "ADD_ANSWER",
      payload: {
        index,
        point,
      },
    });
  };
  const selectChoice = (questionId, choiceItem) => {
    dispatch({
      type: "SELECT_CHOICE",
      payload: {
        questionId,
        choiceItem,
      },
    });
  };
  return { addAnswer, selectChoice };
};

export default useActions;
