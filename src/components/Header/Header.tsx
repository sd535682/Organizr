import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useStore } from "../../store/useStore";
import Button from "../UIcomponents/Button";
import Modal from "../UIcomponents/Modal";
import Input from "../UIcomponents/Input";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { users, currentUserId, addUser, setCurrentUser } = useStore();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const currentUser = users[currentUserId];
  const userList = Object.values(users);

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName("");
      setIsAddUserModalOpen(false);
    }
  };

  const handleUserSwitch = (userId: string) => {
    setCurrentUser(userId);
    setIsUserDropdownOpen(false);
  };

  const isHomePage = location.pathname === "/";

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-4">
              {!isHomePage && (
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  title="Back to boards"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">TaskMaster</h1>
              </div>
            </div>

            {/* Right side - User Management */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7.05 5.84l3.12 3.12M4.03 8.86l3.12 3.12M1.01 11.88l3.12 3.12"
                  />
                </svg>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {currentUser.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Switch User
                      </p>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                      {userList.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleUserSwitch(user.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                            user.id === currentUserId
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.name}</p>
                            {user.id === currentUserId && (
                              <p className="text-xs text-blue-600">
                                Current user
                              </p>
                            )}
                          </div>
                          {user.id === currentUserId && (
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setIsAddUserModalOpen(true);
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">
                          Add New User
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {isUserDropdownOpen && (
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsUserDropdownOpen(false)}
          />
        )}
      </header>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Add New User"
      >
        <div className="space-y-4">
          <Input
            label="User Name"
            value={newUserName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUserName(e.target.value)
            }
            placeholder="Enter user name"
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddUserModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
