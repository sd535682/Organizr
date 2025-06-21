import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { BoardsPage } from "../pages/BoardsPage";
import { BoardDetailsPage } from "../pages/BoardDetailsPage";
import StickyHeader from "../components/Header/StickyHeader";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      {/* Sticky Header common for all pages */}
      <StickyHeader />
      <Routes>
        {/* Default route redirects to boards */}
        <Route path="/" element={<Navigate to="/boards" replace />} />

        {/* Boards listing page */}
        <Route path="/boards" element={<BoardsPage />} />

        {/* Individual board detail page */}
        <Route path="/boards/:boardId" element={<BoardDetailsPage />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};
