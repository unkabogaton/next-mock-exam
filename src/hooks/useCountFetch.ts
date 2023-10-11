import { getCountFromServer, Query } from "firebase/firestore";

const countFetch = async (collection: Query) => {
  const documentSnapshots = await getCountFromServer(collection);
  const count = documentSnapshots.data().count;
  return count;
};

export default countFetch;
