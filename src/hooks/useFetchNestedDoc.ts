import db from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";

const useFetchDoc = (collection: string, docId: string) => {
  const getSingleDoc = async () => {
    const docRef = doc(db, "exams", "LLE", collection, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docId, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return {};
    }
  };
  type Return = Awaited<ReturnType<typeof getSingleDoc>>;
  return useQuery<Return, Error>([collection, docId], getSingleDoc, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    refetchOnReconnect: false,
  });
};

export default useFetchDoc;
