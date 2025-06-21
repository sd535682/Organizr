export interface Board {
  id: string;
  name: string;
  createdBy: string;
  createdDate: string;
  columnCount: number;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
  taskIds: string[];
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  createdBy: string;
  assignedTo: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  createdDate: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
