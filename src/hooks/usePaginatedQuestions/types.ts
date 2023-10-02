export interface PaginatedProps {
  order: [string, "asc" | "desc"];
  exam: string;
  userId: string;
  approved: boolean;
  page: number;
  keywords?: string[];
  category?: string;
}
