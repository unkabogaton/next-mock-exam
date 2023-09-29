import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  where,
  QuerySnapshot,
  Timestamp,
} from "firebase/firestore";
import db from "../firebase";
import { useQuery } from "react-query";
import { useState } from "react";
import iterateFetch from "./IterateFetch";
import countFetch from "./CountFetch";

interface paginatedProps {
  order: string;
  exam: string;
  userId: string;
  approved: boolean;
  page: number;
  keywords?: string[];
}

interface QuestionsProps {
  id: string;
  question: string;
  createdAt: Timestamp;
  approvedBy: string[];
  approvedAt: Timestamp;
  indexNumber: number;
  category: string;
  choices: choicesProps[];
  itemNumber?: number;
}

interface choicesProps {
  choice: string;
  isSelected?: boolean;
  point: number;
}

const usePaginatedQuestions = (props: paginatedProps) => {
  const { order, exam, userId, approved, page, keywords } = props;

  const [startingDocs, setStartingDocs] = useState([{}]);

  const limitNumber = 10;

  const questionsCollections = collection(db, "exams", exam, "questions");
  const constraints = [
    orderBy(order),
    where("createdBy.userId", "==", userId),
    where("approved", "==", approved),
  ];

  keywords?.length != 0
    ? constraints.push(where("keywords", "array-contains-any", keywords))
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
    }: { documentSnapshots: any; cleanedData: QuestionsProps[] } =
      await iterateFetch(questionsQuery);
    const { cleanedData: exp } = await iterateFetch(questionsQuery, [
      "question",
      "choices",
    ]);
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
    ...useQuery(["paginatedQuestions", page], getPaginatedQuestions, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchOnReconnect: false,
    }),
    count,
  };
};

export default usePaginatedQuestions;
