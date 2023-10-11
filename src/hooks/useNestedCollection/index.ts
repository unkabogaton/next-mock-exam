import db from "@/firebase";
import { collection } from "firebase/firestore";
import { nestedCollectionProps } from "./types";

const useNestedCollection = (props: nestedCollectionProps) => {
  const { mainCollection, docId, subcollection } = props;
  const nestedCollection = collection(db, mainCollection, docId, subcollection);
  return nestedCollection;
};

export default useNestedCollection;
