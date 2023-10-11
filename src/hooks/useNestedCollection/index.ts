import db from "@/firebase";
import { collection, CollectionReference } from "firebase/firestore";

const useNestedCollection = (
  mainCollection: string,
  docId: string,
  subcollection: string
): CollectionReference => {
  const nestedCollection = collection(db, mainCollection, docId, subcollection);
  return nestedCollection;
};

export default useNestedCollection;
