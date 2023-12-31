import { collection, orderBy, query } from "firebase/firestore";
import iterateFetch from "../../apis/IterateFetch";
import db from "@/firebase";
import { useQuery } from "react-query";
import { FetchDocsProps } from "./types";

const useFetchDocs = ({
  nestedCollection,
  singleCollection = "exams",
  order,
  attributes,
}: FetchDocsProps) => {
  const fetchData = async () => {
    const fetchCollection = nestedCollection
      ? collection(db, ...nestedCollection)
      : collection(db, singleCollection);
    const collectionQuery = query(fetchCollection, orderBy(...order));
    const { cleanedData } = await iterateFetch(collectionQuery, attributes);
    return cleanedData;
  };
  return useQuery(
    ["fetchDocs", nestedCollection, singleCollection],
    fetchData,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchOnReconnect: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};

export default useFetchDocs;
