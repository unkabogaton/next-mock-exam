export interface FetchDocsProps {
  nestedCollection?: [string, string, string];
  singleCollection?: string;
  attributes?: string[];
  order: [string, "asc" | "desc"];
}
