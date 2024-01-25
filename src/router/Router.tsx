import React from "react";
import { Route, Routes } from "react-router-dom";

import { Return } from "../components/pages/home/Return";
import { BookManagement } from "../components/pages/home/BookManagement";

import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={
        <HeaderLayout>
          <BookManagement />
        </HeaderLayout>
      } />

      <Route path="/book_management" element={
        <HeaderLayout>
          <BookManagement />
        </HeaderLayout>
      } />

      <Route path="/return" element={
        <HeaderLayout>
          <Return />
        </HeaderLayout>
      } />

      <Route path="*" element={
        <HeaderLayout>
          <Page404 />
        </HeaderLayout>
      } />

    </Routes>
  );
};
