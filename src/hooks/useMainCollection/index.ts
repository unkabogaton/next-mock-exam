import db from "@/firebase";
import { collection, CollectionReference } from "firebase/firestore";

const useMainCollection = (mainCollection: string): CollectionReference => {
  const singleMainCollection = collection(db, mainCollection);
  return singleMainCollection;
};

export default useMainCollection;
