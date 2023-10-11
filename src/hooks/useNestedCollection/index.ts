import db from "@/firebase";
import { collection, CollectionReference } from "firebase/firestore";
import { nestedCollectionProps } from "./types";

const useNestedCollection = (
  props: nestedCollectionProps
): CollectionReference => {
  const { mainCollection, docId, subcollection } = props;
  const nestedCollection = collection(db, mainCollection, docId, subcollection);
  return nestedCollection;
};

export default useNestedCollection;
