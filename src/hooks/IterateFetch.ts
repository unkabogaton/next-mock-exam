import { getDocs, Query } from "firebase/firestore";

const iterateFetch = async (collection: Query) => {
  const documentSnapshots = await getDocs(collection);
  const cleanedData: object[] = [];
  documentSnapshots.forEach((doc) => {
    cleanedData.push({ ...doc.data(), id: doc.id });
  });
  return { documentSnapshots, cleanedData };
};

export default iterateFetch;
