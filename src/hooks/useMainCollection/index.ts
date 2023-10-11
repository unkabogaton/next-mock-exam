import db from "@/firebase";
import { collection } from "firebase/firestore";
import { mainCollectionProps } from "./types";

const useMainCollection = (props: mainCollectionProps) => {
  const { mainCollection } = props;
  const singleMainCollection = collection(db, mainCollection);
  return singleMainCollection;
};

export default useMainCollection;
