"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { getTaskById } from "@/lib/task/taskapis";
import { getUserById } from "@/lib/task/userapi";
import TaskCard from "@/components/TaskCard";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/Error";
import PageTitle from "@/components/PageTitle";
import UserCard from "@/components/UserCard";
import { useTask } from "@/context/TaskConext";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { task } = useTask();

  const selectedTask = task?.filter((t) => t.id === parseInt(id))[0];
  
  const userId = selectedTask?.userId ?? null;

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR(selectedTask?.userId ? userId : null, () => getUserById(userId));

  if (userLoading) {
    return <Loading />;
  }

  if (!selectedTask || Object.keys(selectedTask).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500 text-lg">No task found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <PageTitle title="Task Details" />

      <TaskCard task={selectedTask} />

      {/* User error handling */}
      {userError ? (
        <ErrorMessage message={"Failed to load user"} />
      ) : (
        <UserCard user={user?.data} />
      )}
    </div>
  );
}
