"use client";

import { useState } from "react";
import usePaginatedQuestions from "@/hooks/usePaginatedQuestions";
import { ReactQueryDevtools } from "react-query/devtools";
// import { useQueryClient } from "react-query";

const ExamQuestions = ({ params }: { params: { name: string } }) => {
  // const queryClient = useQueryClient();
  // const q = queryClient.getQueryData(["paginatedQuestions", 1, [], ""]);
  // console.log(q);
  // const changeQ = () => {
  //   queryClient.setQueryData(["paginatedQuestions", 1, [], ""], (questions) => {
  //     return questions.slice(0, -1);
  //   });
  //   const q = queryClient.getQueryData(["paginatedQuestions", 1, [], ""]);
  //   console.log(q);
  // };
  const [page, setPage] = useState(1);
  const paginatedQuestionsParams = {
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
  } = usePaginatedQuestions(paginatedQuestionsParams);

  const totalPages = Math.ceil(count! / 10);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>Confirmed Questions</h1>
      <div>
        {page}/{totalPages}
      </div>
      {questions?.map((question) => (
        <div key={question?.id}>
          <h3>{question?.question}</h3>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Next
      </button>
      <ReactQueryDevtools></ReactQueryDevtools>
    </>
  );
};

export default ExamQuestions;
