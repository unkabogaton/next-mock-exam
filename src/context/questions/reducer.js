export const questionsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET": {
      return {
        ...state,
        questions: [payload],
      };
    }
    default:
      throw new Error("No case for that type");
  }
};
