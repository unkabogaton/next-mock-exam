import { createContext, useContext } from "react";

const questions = [
  {
    itemNumber: 1,
    question: "What is the purpose of cataloging in library science?",
    choices: [
      { choice: "Organizing books on shelves", point: 0, isSelected: false },
      {
        choice: "Providing access to library materials",
        point: 1,
        isSelected: false,
      },
      { choice: "Decorating the library", point: 0, isSelected: false },
      { choice: "Managing library staff", point: 0, isSelected: false },
    ],
  },
  {
    itemNumber: 2,
    question: "What is a bibliographic record?",
    choices: [
      { choice: "A list of library patrons", point: 0, isSelected: false },
      {
        choice: "A description of a library item",
        point: 1,
        isSelected: false,
      },
      {
        choice: "A summary of a library's budget",
        point: 0,
        isSelected: false,
      },
      {
        choice: "A report on library circulation",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 3,
    question: "What is the purpose of a call number?",
    choices: [
      {
        choice: "To identify the librarian in charge",
        point: 0,
        isSelected: false,
      },
      {
        choice: "To locate a specific item on the shelf",
        point: 1,
        isSelected: false,
      },
      {
        choice: "To determine the price of a book",
        point: 0,
        isSelected: false,
      },
      { choice: "To track overdue fines", point: 0, isSelected: false },
    ],
  },
  {
    itemNumber: 4,
    question: "What is AACR2 in library cataloging?",
    choices: [
      { choice: "A type of computer software", point: 0, isSelected: false },
      {
        choice: "Anglo-American Cataloging Rules, 2nd edition",
        point: 1,
        isSelected: false,
      },
      { choice: "A cataloging agency in Asia", point: 0, isSelected: false },
      {
        choice: "A library classification system",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 5,
    question: "What is the purpose of subject headings in a catalog record?",
    choices: [
      {
        choice: "To list the book's physical dimensions",
        point: 0,
        isSelected: false,
      },
      {
        choice: "To describe the book's condition",
        point: 0,
        isSelected: false,
      },
      {
        choice: "To provide access points for content topics",
        point: 1,
        isSelected: false,
      },
      {
        choice: "To list the author's other works",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 6,
    question: "What is the primary role of MARC records in cataloging?",
    choices: [
      {
        choice: "Recording library event attendance",
        point: 0,
        isSelected: false,
      },
      {
        choice: "Facilitating electronic exchange of bibliographic data",
        point: 1,
        isSelected: false,
      },
      {
        choice: "Displaying library hours of operation",
        point: 0,
        isSelected: false,
      },
      {
        choice: "Tracking library website visitors",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 7,
    question: "What does the term 'authority control' refer to in cataloging?",
    choices: [
      {
        choice: "Limiting access to certain library materials",
        point: 0,
        isSelected: false,
      },
      {
        choice: "Ensuring consistent headings for names and subjects",
        point: 1,
        isSelected: false,
      },
      {
        choice: "Controlling library budget allocations",
        point: 0,
        isSelected: false,
      },
      {
        choice: "Restricting library hours of operation",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 8,
    question: "What is RDA in library cataloging?",
    choices: [
      { choice: "A type of book binding method", point: 0, isSelected: false },
      {
        choice: "Resource Description and Access",
        point: 1,
        isSelected: false,
      },
      {
        choice: "A library marketing association",
        point: 0,
        isSelected: false,
      },
      {
        choice: "A classification system for non-fiction books",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 9,
    question: "What does the term 'controlled vocabulary' mean in cataloging?",
    choices: [
      {
        choice: "A method for censoring library materials",
        point: 0,
        isSelected: false,
      },
      {
        choice:
          "A standardized list of terms used to itemNumber and retrieve information",
        point: 1,
        isSelected: false,
      },
      {
        choice: "A system for tracking library fines",
        point: 0,
        isSelected: false,
      },
      {
        choice: "A method for organizing library events",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 10,
    question:
      "What is the purpose of the International Standard Book Number (ISBN)?",
    choices: [
      {
        choice: "To identify library staff members",
        point: 0,
        isSelected: false,
      },
      {
        choice: "To provide a unique identifier for books",
        point: 1,
        isSelected: false,
      },
      {
        choice: "To categorize library materials by genre",
        point: 0,
        isSelected: false,
      },
      {
        choice: "To track library circulation statistics",
        point: 0,
        isSelected: false,
      },
    ],
  },
  {
    itemNumber: 11,
    question: "What is the role of a union catalog in library science?",
    choices: [
      {
        choice: "To organize employee training programs",
        point: 0,
        isSelected: false,
      },
      {
        choice:
          "To combine the holdings of multiple libraries into a single searchable catalog",
        point: 1,
        isSelected: false,
      },
      {
        choice: "To manage library building maintenance",
        point: 0,
        isSelected: false,
      },
      {
        choice: "To coordinate library outreach efforts",
        point: 0,
        isSelected: false,
      },
    ],
  },
];

export const QuestionsContext = createContext();

export const initialState = {
  questions: questions,
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within Questions Provider");
  }
  return context;
};
