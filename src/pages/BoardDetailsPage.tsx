import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useStore } from "../store/useStore";
import Header from "../components/Header/Header";
import Column from "../components/Column/Column";
import TaskCard from "../components/TaskCard/TaskCard";
import Button from "../components/UIcomponents/Button";
import Modal from "../components/UIcomponents/Modal";

export default function BoardDetailsPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { boards, columns, tasks, createColumn, moveTask, reorderTasks } =
    useStore();

  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (!boardId || !boards[boardId]) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Board not found
            </h1>
            <Button onClick={() => navigate("/")}>Back to Boards</Button>
          </div>
        </div>
      </div>
    );
  }

  const board = boards[boardId];
  const boardColumns = Object.values(columns).filter(
    (col) => col.boardId === boardId
  );
  const boardTasks = Object.values(tasks).filter((task) =>
    boardColumns.some((col) => col.id === task.columnId)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks[active.id as string];
    if (!activeTask) return;

    const overId = over.id as string;
    const overColumn = columns[overId];

    if (overColumn && activeTask.columnId !== overId) {
      moveTask(activeTask.id, overId, 0);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks[active.id as string];
    if (!activeTask) return;

    const overId = over.id as string;
    // const overColumn = columns[overId];
    const overTask = tasks[overId];

    if (overTask) {
      const overColumnId = overTask.columnId;
      const overColumn = columns[overColumnId];
      const activeColumn = columns[activeTask.columnId];

      if (activeTask.columnId === overColumnId) {
        // Reordering within the same column
        const oldIndex = activeColumn.taskIds.indexOf(activeTask.id);
        const newIndex = overColumn.taskIds.indexOf(overTask.id);

        const newTaskIds = arrayMove(activeColumn.taskIds, oldIndex, newIndex);
        reorderTasks(overColumnId, newTaskIds);
      } else {
        // Moving to a different column
        const newIndex = overColumn.taskIds.indexOf(overTask.id);
        moveTask(activeTask.id, overColumnId, newIndex);
      }
    }
  };

  const handleCreateColumn = () => {
    if (newColumnTitle.trim()) {
      createColumn(boardId, newColumnTitle.trim());
      setNewColumnTitle("");
      setIsColumnModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="secondary">🔍 Filter</Button>
            <Button variant="secondary">↕️ Sort</Button>
            <Button onClick={() => setIsColumnModalOpen(true)}>
              + Add Column
            </Button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {boardColumns.map((column) => {
              const columnTasks = boardTasks.filter(
                (task) => task.columnId === column.id
              );
              return (
                <Column key={column.id} column={column} tasks={columnTasks} />
              );
            })}
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={tasks[activeTask]} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <Modal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        title="Add New Column"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Column Title
            </label>
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter column title"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsColumnModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateColumn}>Add Column</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
