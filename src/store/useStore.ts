/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Board, Column, Task, User } from "../types";

// Interface for the store state
interface StoreState {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  users: Record<string, User>;
  currentUserId: string;

  // User actions for user management
  addUser: (name: string) => string;
  setCurrentUser: (userId: string) => void;

  // Board actions for board management
  createBoard: (name: string, createdBy: string) => string;
  deleteBoard: (boardId: string) => void;

  // Column actions for column management
  createColumn: (boardId: string, title: string) => string;
  updateColumn: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;

  // Task actions for task management
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

// Function to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Function to generate a random avatar
const generateAvatar = (name: string) => {
  // Array of avatar URLs from Pexels
  const avatars = [
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
    "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  ];

  // Generate a hash based on the name
  const hash = name.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  // Return a random avatar URL
  return avatars[Math.abs(hash) % avatars.length];
};

// Initial users
const initialUsers: Record<string, User> = {
  user1: {
    id: "user1",
    name: "Subhadeep Das",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  },
  user2: {
    id: "user2",
    name: "Susmita Sarkar",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1",
  },
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      boards: {
        // Initial board
        board1: {
          id: "board1",
          name: "Marketing Campaign",
          createdBy: "Subhadeep Das",
          createdDate: "2023-08-15",
          columnCount: 3,
        },
      },
      columns: {
        // Initial columns
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
        // Initial tasks
        task1: {
          id: "task1",
          title: "Design the landing page",
          description:
            "Create a visually appealing and user-friendly landing page for the new product.",
          columnId: "col1",
          createdBy: "user1",
          assignedTo: "user2",
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
          createdBy: "user1",
          assignedTo: "user2",
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
          createdBy: "user1",
          assignedTo: "user2",
          priority: "low",
          dueDate: "2023-11-15",
          createdDate: "2023-10-17",
        },
        task4: {
          id: "task4",
          title: "Develop the core features",
          description: "Implement the main functionalities of the application.",
          columnId: "col2",
          createdBy: "user1",
          assignedTo: "user2",
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
          createdBy: "user1",
          assignedTo: "user2",
          priority: "medium",
          dueDate: "2023-11-05",
          createdDate: "2023-10-19",
        },
        task6: {
          id: "task6",
          title: "Plan the project roadmap",
          description: "Define the project goals, milestones, and timelines.",
          columnId: "col3",
          createdBy: "user1",
          assignedTo: "user2",
          priority: "high",
          dueDate: "2023-10-10",
          createdDate: "2023-10-01",
        },
        task7: {
          id: "task7",
          title: "Gather user requirements",
          description: "Collect and analyze user needs and expectations.",
          columnId: "col3",
          createdBy: "user2",
          assignedTo: "user1",
          priority: "medium",
          dueDate: "2023-10-05",
          createdDate: "2023-09-25",
        },
      },
      // Initial users
      users: initialUsers,
      currentUserId: "user1",

      // Create user
      addUser: (name: string) => {
        const id = generateId();
        const newUser: User = {
          id,
          name,
          avatar: generateAvatar(name),
        };

        set((state) => ({
          users: { ...state.users, [id]: newUser },
        }));

        return id;
      },

      // Set current user
      setCurrentUser: (userId: string) => {
        set({ currentUserId: userId });
      },

      // Create board
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

      // Delete board
      deleteBoard: (boardId: string) => {
        set((state) => {
          const { [boardId]: deletedBoard, ...remainingBoards } = state.boards;

          // Delete columns and tasks
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

      // Create column
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

      // Update column
      updateColumn: (columnId: string, title: string) => {
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: { ...state.columns[columnId], title },
          },
        }));
      },

      // Delete column
      deleteColumn: (columnId: string) => {
        set((state) => {
          const column = state.columns[columnId];
          if (!column) return state;

          const { [columnId]: deletedColumn, ...remainingColumns } =
            state.columns;

          // Delete tasks
          const newTasks = { ...state.tasks };
          column.taskIds.forEach((taskId) => delete newTasks[taskId]);

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

      // Create task
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

      // Update task
      updateTask: (taskId: string, updates: Partial<Task>) => {
        set((state) => ({
          tasks: {
            ...state.tasks,
            [taskId]: { ...state.tasks[taskId], ...updates },
          },
        }));
      },

      // Delete task
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
                  (id) => id !== taskId
                ),
              },
            },
          };
        });
      },

      // Move task
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

          // Remove from source column
          const newSourceTaskIds = sourceColumn.taskIds.filter(
            (id) => id !== taskId
          );

          // Add to target column
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

      // Reorder tasks
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
