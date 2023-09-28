"use client";

import React from "react";
import useQuestions from "@/hooks/useQuestions";

const ConfirmedQuestions = () => {
  const { isLoading, data: questions } = useQuestions();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>Confirmed Questions</h1>
    </>
  );
};

export default ConfirmedQuestions;
