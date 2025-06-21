/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Board, Column, Task, User } from "../types/index";

interface StoreState {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  users: Record<string, User>;

  createBoard: (name: string, createdBy: string) => string;
  deleteBoard: (boardId: string) => void;

  createColumn: (boardId: string, title: string) => string;
  updateColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;

  createTask: (columnId: string, task: Omit<Task, "id" | "columnId">) => string;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (
    taskId: string,
    targetColumnId: string,
    targetIndex: number
  ) => void;
  reorderTasks: (columnId: string, taskIds: string[]) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialUsers: Record<string, User> = {
  user1: {
    id: "user1",
    name: "Sarah Miller",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  },
  user2: {
    id: "user2",
    name: "David Lee",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  },
  user3: {
    id: "user3",
    name: "Emily Chen",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  },
  user4: {
    id: "user4",
    name: "Michael Brown",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  },
  user5: {
    id: "user5",
    name: "Jessica Wilson",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  },
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      boards: {
        board1: {
          id: "board1",
          name: "Marketing Campaign",
          createdBy: "Sarah Miller",
          createdDate: "2023-08-15",
          columnCount: 4,
        },
        board2: {
          id: "board2",
          name: "Product Launch",
          createdBy: "David Lee",
          createdDate: "2023-07-22",
          columnCount: 5,
        },
        board3: {
          id: "board3",
          name: "Event Planning",
          createdBy: "Emily Chen",
          createdDate: "2023-06-10",
          columnCount: 3,
        },
        board4: {
          id: "board4",
          name: "Customer Feedback",
          createdBy: "Michael Brown",
          createdDate: "2023-05-05",
          columnCount: 6,
        },
        board5: {
          id: "board5",
          name: "Team Onboarding",
          createdBy: "Jessica Wilson",
          createdDate: "2023-04-18",
          columnCount: 2,
        },
      },
      columns: {
        col1: {
          id: "col1",
          title: "To Do",
          boardId: "board1",
          taskIds: ["task1", "task2", "task3"],
          order: 0,
        },
        col2: {
          id: "col2",
          title: "In Progress",
          boardId: "board1",
          taskIds: ["task4", "task5"],
          order: 1,
        },
        col3: {
          id: "col3",
          title: "Completed",
          boardId: "board1",
          taskIds: ["task6", "task7"],
          order: 2,
        },
      },
      tasks: {
        task1: {
          id: "task1",
          title: "Design the landing page",
          description:
            "Create a visually appealing and user-friendly landing page for the new product.",
          columnId: "col1",
          createdBy: "Sarah Miller",
          assignedTo: "David Lee",
          priority: "high",
          dueDate: "2023-10-25",
          createdDate: "2023-10-15",
        },
        task2: {
          id: "task2",
          title: "Implement user authentication",
          description:
            "Set up a secure user authentication system using industry best practices.",
          columnId: "col1",
          createdBy: "Emily Chen",
          assignedTo: "Michael Brown",
          priority: "medium",
          dueDate: "2023-11-02",
          createdDate: "2023-10-16",
        },
        task3: {
          id: "task3",
          title: "Write API documentation",
          description:
            "Create comprehensive documentation for the backend API.",
          columnId: "col1",
          createdBy: "David Lee",
          assignedTo: "Jessica Wilson",
          priority: "low",
          dueDate: "2023-11-15",
          createdDate: "2023-10-17",
        },
        task4: {
          id: "task4",
          title: "Develop the core features",
          description: "Implement the main functionalities of the application.",
          columnId: "col2",
          createdBy: "Michael Brown",
          assignedTo: "Sarah Miller",
          priority: "high",
          dueDate: "2023-10-30",
          createdDate: "2023-10-18",
        },
        task5: {
          id: "task5",
          title: "Set up the database",
          description:
            "Configure and optimize the database for the application.",
          columnId: "col2",
          createdBy: "Jessica Wilson",
          assignedTo: "Emily Chen",
          priority: "medium",
          dueDate: "2023-11-05",
          createdDate: "2023-10-19",
        },
        task6: {
          id: "task6",
          title: "Plan the project roadmap",
          description: "Define the project goals, milestones, and timelines.",
          columnId: "col3",
          createdBy: "Sarah Miller",
          assignedTo: "David Lee",
          priority: "high",
          dueDate: "2023-10-10",
          createdDate: "2023-10-01",
        },
        task7: {
          id: "task7",
          title: "Gather user requirements",
          description: "Collect and analyze user needs and expectations.",
          columnId: "col3",
          createdBy: "Emily Chen",
          assignedTo: "Michael Brown",
          priority: "medium",
          dueDate: "2023-10-05",
          createdDate: "2023-09-25",
        },
      },
      users: initialUsers,

      createBoard: (name: string, createdBy: string) => {
        const id = generateId();
        const newBoard: Board = {
          id,
          name,
          createdBy,
          createdDate: new Date().toISOString().split("T")[0],
          columnCount: 0,
        };

        set((state) => ({
          boards: { ...state.boards, [id]: newBoard },
        }));

        return id;
      },

      deleteBoard: (boardId: string) => {
        set((state) => {
          const { [boardId]: deletedBoard, ...remainingBoards } = state.boards;

          const columnsToDelete = Object.keys(state.columns).filter(
            (colId) => state.columns[colId].boardId === boardId
          );
          const tasksToDelete = Object.keys(state.tasks).filter((taskId) =>
            columnsToDelete.includes(state.tasks[taskId].columnId)
          );

          const newColumns = { ...state.columns };
          const newTasks = { ...state.tasks };

          columnsToDelete.forEach((colId) => delete newColumns[colId]);
          tasksToDelete.forEach((taskId) => delete newTasks[taskId]);

          return {
            boards: remainingBoards,
            columns: newColumns,
            tasks: newTasks,
          };
        });
      },

      createColumn: (boardId: string, title: string) => {
        const id = generateId();
        const boardColumns = Object.values(get().columns).filter(
          (col) => col.boardId === boardId
        );
        const order = boardColumns.length;

        const newColumn: Column = {
          id,
          title,
          boardId,
          taskIds: [],
          order,
        };

        set((state) => ({
          columns: { ...state.columns, [id]: newColumn },
          boards: {
            ...state.boards,
            [boardId]: {
              ...state.boards[boardId],
              columnCount: state.boards[boardId].columnCount + 1,
            },
          },
        }));

        return id;
      },

      updateColumn: (columnId: string, title: string) => {
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: { ...state.columns[columnId], title },
          },
        }));
      },

      deleteColumn: (columnId: string) => {
        set((state) => {
          const column = state.columns[columnId];
          if (!column) return state;

          const { [columnId]: deletedColumn, ...remainingColumns } =
            state.columns;

          const newTasks = { ...state.tasks };
          column.taskIds.forEach(
            (taskId: string | number) => delete newTasks[taskId]
          );

          return {
            columns: remainingColumns,
            tasks: newTasks,
            boards: {
              ...state.boards,
              [column.boardId]: {
                ...state.boards[column.boardId],
                columnCount: Math.max(
                  0,
                  state.boards[column.boardId].columnCount - 1
                ),
              },
            },
          };
        });
      },

      createTask: (columnId: string, task: Omit<Task, "id" | "columnId">) => {
        const id = generateId();
        const newTask: Task = {
          ...task,
          id,
          columnId,
          createdDate: new Date().toISOString().split("T")[0],
        };

        set((state) => ({
          tasks: { ...state.tasks, [id]: newTask },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds: [...state.columns[columnId].taskIds, id],
            },
          },
        }));

        return id;
      },

      updateTask: (taskId: string, updates: Partial<Task>) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: { ...state.tasks[taskId], ...updates },
          },
        }));
      },

      deleteTask: (taskId: string) => {
        set((state) => {
          const task = state.tasks[taskId];
          if (!task) return state;

          const { [taskId]: deletedTask, ...remainingTasks } = state.tasks;

          return {
            tasks: remainingTasks,
            columns: {
              ...state.columns,
              [task.columnId]: {
                ...state.columns[task.columnId],
                taskIds: state.columns[task.columnId].taskIds.filter(
                  (id: string) => id !== taskId
                ),
              },
            },
          };
        });
      },

      moveTask: (
        taskId: string,
        targetColumnId: string,
        targetIndex: number
      ) => {
        set((state) => {
          const task = state.tasks[taskId];
          if (!task) return state;

          const sourceColumn = state.columns[task.columnId];
          const targetColumn = state.columns[targetColumnId];

          if (!sourceColumn || !targetColumn) return state;

          const newSourceTaskIds = sourceColumn.taskIds.filter(
            (id: string) => id !== taskId
          );
          const newTargetTaskIds = [...targetColumn.taskIds];
          newTargetTaskIds.splice(targetIndex, 0, taskId);

          return {
            tasks: {
              ...state.tasks,
              [taskId]: { ...task, columnId: targetColumnId },
            },
            columns: {
              ...state.columns,
              [sourceColumn.id]: { ...sourceColumn, taskIds: newSourceTaskIds },
              [targetColumn.id]: { ...targetColumn, taskIds: newTargetTaskIds },
            },
          };
        });
      },

      reorderTasks: (columnId: string, taskIds: string[]) => {
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: { ...state.columns[columnId], taskIds },
          },
        }));
      },
    }),
    {
      name: "task-board-storage",
    }
  )
);
