import db from "@/firebase";
import { collection, CollectionReference } from "firebase/firestore";
import { mainCollectionProps } from "./types";

const useMainCollection = (props: mainCollectionProps): CollectionReference => {
  const { mainCollection } = props;
  const singleMainCollection = collection(db, mainCollection);
  return singleMainCollection;
};

export default useMainCollection;
