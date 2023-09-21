import React, { ReactElement } from "react";

interface ChoiceProps {
  letter: string;
  choice: string;
}

const Choice = (props: ChoiceProps): ReactElement => {
  const { letter, choice } = props;
  return (
    <>
      {letter}. {choice}
    </>
  );
};

Choice.defaultProps = {
  letter: "A",
  choice: "",
};

export default Choice;
