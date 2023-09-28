import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  where,
} from "firebase/firestore";
import db from "../firebase";
import { useQuery } from "react-query";
import { useState } from "react";
import iterateFetch from "./IterateFetch";

interface paginatedProps {
  order: string;
  exam: string;
  userId: string;
  approved: boolean;
  page: number;
}

const usePaginatedQuestions = (props: paginatedProps) => {
  const { order, exam, userId, approved, page } = props;

  const [startingDocs, setStartingDocs] = useState([{}]);

  const questionsCollections = collection(db, "exams", exam, "questions");
  const constraints = [
    orderBy(order),
    where("createdBy", "==", userId),
    where("approved", "==", approved),
    limit(10),
  ];

  const getPaginatedQuestions = async () => {
    return page == 1 ? getInitial() : getNext();
  };

  const getInitial = async () => {
    const first = query(questionsCollections, ...constraints);
    const { documentSnapshots, cleanedData } = await iterateFetch(first);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setStartingDocs((prevArray) => [...prevArray, lastVisible]);
    return cleanedData;
  };

  const getNext = async () => {
    const next = query(
      questionsCollections,
      ...constraints,
      startAfter(startingDocs[page - 1])
    );
  };
  return useQuery(["paginatedQuestions", page], getPaginatedQuestions, {
    refetchOnMount: false,
  });
};

export default usePaginatedQuestions;
