"use client";

import Link from "next/link";
import useFetchDocs from "@/hooks/useFetchDocs";
import { useQuestions } from "@/context/questions/store";
import { useParams, usePathname } from "next/navigation";
import OutlinedCard from "@/components/OutlinedCard";

const ChooseCategory = () => {
  const { setCategory } = useQuestions();

  const params = useParams();
  const pathname = usePathname();
  const examId = params.examId;
  const categoriesParams = {
    nestedCollection: ["exams", examId, "categories"] as [
      string,
      string,
      string
    ],
    order: ["name", "asc"] as [string, "asc" | "desc"],
  };
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useFetchDocs(categoriesParams);

  return (
    <>
      {categories?.map((category) => (
        <Link key={category.id} href={`${pathname}/${category.name}?page=1`}>
          <OutlinedCard onClick={() => setCategory(category)}>
            <h3>{category.name}</h3>
          </OutlinedCard>
        </Link>
      ))}
    </>
  );
};

export default ChooseCategory;
