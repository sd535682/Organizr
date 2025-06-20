import React from "react";
import { Link, useLocation } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/boards" className="text-xl font-bold text-gray-900">
                BoardApp
              </Link>

              {/* Breadcrumb Navigation */}
              <nav className="flex items-center space-x-2 text-sm">
                <Link
                  to="/boards"
                  className={`hover:text-blue-600 ${
                    location.pathname === "/boards"
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  Boards
                </Link>
                {location.pathname.includes("/boards/") &&
                  location.pathname !== "/boards" && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-900 font-medium">
                        Board Detail
                      </span>
                    </>
                  )}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
