import { getDocs, Query } from "firebase/firestore";

const iterateFetch = async (collection: Query, attributes?: string[]) => {
  const documentSnapshots = await getDocs(collection);
  const cleanedData: any = [];
  documentSnapshots.forEach((doc) => {
    if (attributes) {
      const filteredData = attributes.reduce(
        (obj, attribute) => ({ ...obj, [attribute]: doc.data()[attribute] }),
        {}
      );
      cleanedData.push({ ...filteredData, id: doc.id });
    } else {
      cleanedData.push({ ...doc.data(), id: doc.id });
    }
  });
  return { documentSnapshots, cleanedData };
};

export default iterateFetch;
