import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../store/useStore";
import Header from "../components/Header/Header";
import Button from "../components/UIcomponents/Button";
import Modal from "../components/UIcomponents/Modal";
import Input from "../components/UIcomponents/Input";
import Select from "../components/UIcomponents/Select";

export default function BoardsPage() {
  const navigate = useNavigate();
  const { boards, users, currentUserId, createBoard, deleteBoard } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [createdBy, setCreatedBy] = useState(currentUserId);

  const boardList = Object.values(boards).sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  const userOptions = Object.values(users).map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      const boardId = createBoard(newBoardName.trim(), users[createdBy].name);
      setNewBoardName("");
      setIsModalOpen(false);
      navigate(`/board/${boardId}`);
    }
  };

  const handleDeleteBoard = (boardId: string, boardName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${boardName}"? This action cannot be undone.`
      )
    ) {
      deleteBoard(boardId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Create Button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Task Boards</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            + Create New Board
          </Button>
        </div>

        {/* Boards Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Board Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Columns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {boardList.map((board) => (
                <tr key={board.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {board.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {board.createdBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(board.createdDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {board.columnCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => navigate(`/boards/${board.id}`)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteBoard(board.id, board.name)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {boardList.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No boards yet
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first task board.
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Create Your First Board
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Create Board Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Board"
      >
        <div className="space-y-4">
          <Input
            label="Board Name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="Enter board name"
            required
          />

          <Select
            label="Created By"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            options={userOptions}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateBoard}>Create Board</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
