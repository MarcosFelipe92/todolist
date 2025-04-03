import { useState } from "react";

export function useModal() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    isEditModalOpen,
    isDeleteModalOpen,
    currentTask,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
  };
}
