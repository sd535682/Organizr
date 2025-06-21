import React, { useState } from "react";
import type { Task } from "../../types";
import { useStore } from "../../store/useStore";
import Button from "../UIcomponents/Button";
import Input from "../UIcomponents/Input";
import Textarea from "../UIcomponents/TextArea";
import Select from "../UIcomponents/Select";

interface TaskFormProps {
  columnId: string;
  task?: Task | null;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  columnId,
  task,
  onClose,
}) => {
  const { users, currentUserId, createTask, updateTask } = useStore();
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    assignedTo: task?.assignedTo || currentUserId,
    priority: task?.priority || ("medium" as const),
    dueDate: task?.dueDate || new Date().toISOString().split("T")[0],
    createdBy: task?.createdBy || currentUserId,
  });

  const userOptions = Object.values(users).map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const priorityOptions = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    if (task) {
      updateTask(task.id, formData);
    } else {
      createTask(columnId, formData as Omit<Task, "columnId" | "id">);
    }

    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        value={formData.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange("title", e.target.value)
        }
        placeholder="Enter task title"
        required
      />

      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleChange("description", e.target.value)
        }
        placeholder="Enter task description"
        rows={4}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Assigned To"
          value={formData.assignedTo}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange("assignedTo", e.target.value)
          }
          options={userOptions}
        />

        <Select
          label="Priority"
          value={formData.priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange("priority", e.target.value)
          }
          options={priorityOptions}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange("dueDate", e.target.value)
          }
          required
        />

        <Select
          label="Created By"
          value={formData.createdBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange("createdBy", e.target.value)
          }
          options={userOptions}
          disabled={!!task}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{task ? "Update Task" : "Create Task"}</Button>
      </div>
    </form>
  );
};
