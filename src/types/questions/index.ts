import { Timestamp } from "firebase/firestore";

export interface QuestionsTypes {
  choices: ChoicesTypes[];
  question: string;
}

export interface QuestionsTypesFull extends QuestionsTypes {
  approval: UserAndDateType;
  approved: boolean;
  category: string;
  created: UserAndDateType;
  id: string;
  indexNumber: number;
  keywords: string[];
  updated?: UserAndDateType;
}

export interface ChoicesTypes {
  choice: string;
  isSelected?: boolean;
  point: number;
}

interface UserAndDateType {
  date: Timestamp;
  userEmail: string;
  userId: string;
  userName: string;
}
