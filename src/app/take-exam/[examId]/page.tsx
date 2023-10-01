"use client";

import ChooseCategory from "@/screens/ChooseCategory";
import QuestionsProvider from "@/context/questions";

const ChooseCategoryPage = () => {
  return (
    <>
      <QuestionsProvider>
        <h1>Choose Category</h1>
        <ChooseCategory />
      </QuestionsProvider>
    </>
  );
};

export default ChooseCategoryPage;
