import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  where,
  QuerySnapshot,
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

  const limitNumber = 10;

  const questionsCollections = collection(db, "exams", exam, "questions");
  const constraints = [
    orderBy(order),
    where("createdBy", "==", userId),
    where("approved", "==", approved),
    limit(limitNumber),
  ];

  const first = query(questionsCollections, ...constraints);
  const next = query(
    questionsCollections,
    ...constraints,
    startAfter(startingDocs[page - 1])
  );

  const getPaginatedQuestions = async () => {
    let query;
    page == 1 ? (query = first) : (query = next);
    const { documentSnapshots, cleanedData } = await iterateFetch(query);
    addStartingDoc(documentSnapshots);
    return cleanedData;
  };

  const addStartingDoc = (documentSnapshots: QuerySnapshot) => {
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setStartingDocs((prevArray) => {
      const newArray = [...prevArray];
      newArray[page - 1] = lastVisible;
      return newArray;
    });
  };

  return useQuery(["paginatedQuestions", page], getPaginatedQuestions, {
    refetchOnMount: false,
    keepPreviousData: true,
  });
};

export default usePaginatedQuestions;
