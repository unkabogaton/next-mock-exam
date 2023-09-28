import { useQuery } from "react-query";
import db from "../firebase";
import { collectionGroup, getDocs, query, Timestamp } from "firebase/firestore";

const useQuestions = () => {
  const questionsCollections = collectionGroup(db, "questions");
  const fetchQuestions = async () => {
    const questionsSnap = await getDocs(questionsCollections);
    const questions: any[] = [];
    questionsSnap.forEach((doc) => {
      questions.push({ ...doc.data(), id: doc.id });
    });
    console.log(questions);
    return questions;
  };
  return useQuery("questions", fetchQuestions, {
    refetchOnMount: false,
  });
};

export default useQuestions;
