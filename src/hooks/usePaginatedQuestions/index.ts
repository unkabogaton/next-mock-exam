import {
  query,
  orderBy,
  startAfter,
  limit,
  where,
  QuerySnapshot,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { useQuery } from "react-query";
import { useState } from "react";
import iterateFetch from "../useIterateFetch";
import countFetch from "../useCountFetch";
import { PaginatedProps } from "./types";
import { QuestionsTypesFull } from "@/types/questions";
import useNestedCollection from "../useNestedCollection";

const usePaginatedQuestions = (props: PaginatedProps) => {
  const { order, exam, userId, approved, page, keywords, category } = props;

  const [startingDocs, setStartingDocs] = useState([{}]);

  const limitNumber = 10;
  const questionsCollections = useNestedCollection("exams", exam, "questions");
  const constraints = [
    orderBy(...order),
    where("created.userId", "==", userId),
    where("approved", "==", approved),
  ];

  keywords && keywords.length !== 0
    ? constraints.push(where("keywords", "array-contains-any", keywords))
    : "";

  category && category !== ""
    ? constraints.push(where("category", "==", category))
    : "";

  let questionsQuery = query(questionsCollections, ...constraints);

  const getCount = async () => {
    const count = await countFetch(questionsQuery);
    return count;
  };

  const getPaginatedQuestions = async () => {
    if (page == 1) {
      questionsQuery = query(
        questionsCollections,
        ...constraints,
        limit(limitNumber)
      );
    } else {
      questionsQuery = query(
        questionsCollections,
        ...constraints,
        startAfter(startingDocs[page - 1]),
        limit(limitNumber)
      );
    }
    const {
      documentSnapshots,
      cleanedData,
    }: { documentSnapshots: any; cleanedData: QuestionsTypesFull[] } =
      await iterateFetch(questionsQuery);
    const { cleanedData: exp } = await iterateFetch(questionsQuery, []);
    console.log(exp);
    addStartingDoc(documentSnapshots);
    return cleanedData;
  };

  const addStartingDoc = (documentSnapshots: QuerySnapshot) => {
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setStartingDocs((prevArray) => {
      const newArray = [...prevArray];
      newArray[page] = lastVisible;
      return newArray;
    });
  };

  const { data: count } = useQuery(["count", constraints], getCount, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    ...useQuery(
      ["paginatedQuestions", page, keywords, category],
      getPaginatedQuestions,
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        refetchOnReconnect: false,
      }
    ),
    count,
  };
};

export default usePaginatedQuestions;
