import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Column as ColumnType, Task } from "../../types";
import TaskCard from "../TaskCard/TaskCard";
import Button from "../UIcomponents/Button";
import Modal from "../UIcomponents/Modal";
import { TaskForm } from "../TaskForm/TaskForm";
import { useStore } from "../../store/useStore";
import { SquarePen, Trash } from "lucide-react";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export default function Column({ column, tasks }: ColumnProps) {
  const { updateColumn, deleteColumn, deleteTask } = useStore();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleTitleSave = () => {
    if (editTitle.trim() && editTitle !== column.title) {
      updateColumn(column.id, editTitle.trim());
    }
    setIsEditingTitle(false);
    setEditTitle(column.title);
  };

  const handleTitleCancel = () => {
    setEditTitle(column.title);
    setIsEditingTitle(false);
  };

  const handleDeleteColumn = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${column.title}" column? This will also delete all tasks in this column.`
      )
    ) {
      deleteColumn(column.id);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0 max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        {isEditingTitle ? (
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleSave();
                if (e.key === "Escape") handleTitleCancel();
              }}
              className="flex-1 px-2 py-1 text-sm font-semibold bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        ) : (
          <h2
            className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setIsEditingTitle(true)}
          >
            {column.title}
          </h2>
        )}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsEditingTitle(true)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer"
            title="Edit column"
          >
            <SquarePen className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteColumn}
            className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
            title="Delete column"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <div key={task.id} className="group">
              <TaskCard
                task={task}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            </div>
          ))}
        </SortableContext>
      </div>

      <Button
        variant="secondary"
        className="w-full mt-4 text-blue-600 border-2 shadow-md border-b-gray-200 hover:bg-blue-50 cursor-pointer"
        onClick={() => setIsTaskModalOpen(true)}
      >
        + Add Card
      </Button>

      <Modal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? "Edit Task" : "Add New Task"}
        size="lg"
      >
        <TaskForm
          columnId={column.id}
          task={editingTask}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
