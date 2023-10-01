"use client";

import useFetchDocs from "@/hooks/useFetchDocs";
import OutlinedCard from "@/components/OutlinedCard";
import Link from "next/link";

type examType = {
  id: string;
  shortName: string;
  name: string;
  field: string;
  details: string;
};

const ChooseExam = () => {
  const examsParams = {
    singleCollection: "exams",
    order: ["shortName", "asc"] as [string, "asc" | "desc"],
  };
  const { data: exams, isLoading, isError, error } = useFetchDocs(examsParams);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      {exams?.map((exam: examType) => (
        <Link
          key={exam.id}
          href={`/take-exam/${exam.id}?exam=${exam.shortName}`}
        >
          <OutlinedCard>
            <h3>{exam.shortName}</h3>
            <h4>{exam.name}</h4>
            <h5>{exam.field}</h5>
          </OutlinedCard>
        </Link>
      ))}
    </>
  );
};

export default ChooseExam;
