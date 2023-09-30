"use client";

import { useState } from "react";
import usePaginatedQuestions from "@/hooks/usePaginatedQuestions";

const ExamQuestions = ({ params }: { params: { name: string } }) => {
  const [page, setPage] = useState(1);
  const queryProps = {
    order: ["created.date", "desc"] as [string, "asc" | "desc"],
    exam: params.name,
    userId: "54321",
    approved: true,
    page: page,
    keywords: [],
    category: "",
  };

  const {
    isLoading,
    data: questions,
    count,
  } = usePaginatedQuestions(queryProps);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>Confirmed Questions</h1>
      <div>{count}</div>
      {questions?.map((question) => (
        <div key={question?.id}>
          <h3>{question?.question}</h3>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
};

export default ExamQuestions;
