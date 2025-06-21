import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../types";
import { useStore } from "../../store/useStore";
import { SquarePen, Trash } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { users } = useStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  const assignedUser = users[task.assignedTo];
  const createdByUser = users[task.createdBy];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-gray-900 text-sm leading-tight">
          {task.title}
        </h3>
        {(onEdit || onDelete) && (
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer"
              >
                <SquarePen className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
              >
                <Trash className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className="text-xs text-gray-500">
          📅{" "}
          {new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {assignedUser && (
            <img
              src={assignedUser.avatar}
              alt={assignedUser.name}
              className="w-6 h-6 rounded-full"
            />
          )}
          {createdByUser && assignedUser?.id !== createdByUser.id && (
            <img
              src={createdByUser.avatar}
              alt={createdByUser.name}
              className="w-6 h-6 rounded-full opacity-60"
            />
          )}
        </div>
      </div>
    </div>
  );
}
