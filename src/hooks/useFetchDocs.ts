import { collection, orderBy, query } from "firebase/firestore";
import iterateFetch from "@/apis/iterateFetch";
import db from "@/firebase";
import { useQuery } from "react-query";

type fetchDocsProps = {
  nestedCollection: [string, string, string];
  singleCollection: string;
  order: string;
};

const useFetchDocs = (props: fetchDocsProps) => {
  const { nestedCollection, singleCollection, order } = props;
  const fetchData = async () => {
    let fetchCollection = collection(db, "exams");
    if (nestedCollection) {
      fetchCollection = collection(db, ...nestedCollection);
    } else if (singleCollection) {
      fetchCollection = collection(db, singleCollection);
    }
    const collectionQuery = query(fetchCollection, orderBy(order));
    const { cleanedData } = await iterateFetch(collectionQuery);
    return cleanedData;
  };
  return useQuery(["fetchDocs", singleCollection], fetchData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    refetchOnReconnect: false,
  });
};

export default useFetchDocs;
