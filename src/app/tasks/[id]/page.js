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

export default function TaskDetailPage() {
  const { id } = useParams();

  const {
    data: task,
    error: taskError,
    isLoading: taskLoading,
  } = useSWR([`/task/${id}`], () => getTaskById(id));

  const userId = task?.data?.userId ?? null;

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR(userId, () => getUserById(userId));

  // Show loading if either fetch is loading
  if (taskLoading || userLoading) {
    return <Loading />;
  }

  // Handle task fetch errors
  if (taskError) {
    return (
      <ErrorMessage message={taskError.message || "Failed to load task"} />
    );
  }

  // Show if no task found or empty data
  if (!task?.data || Object.keys(task.data).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500 text-lg">No task found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <PageTitle title="Task Details" />

      <TaskCard task={task.data} />

      {/* User error handling */}
      {userError ? (
        <ErrorMessage message={"Failed to load user"} />
      ) : (
        <UserCard user={user?.data} />
      )}
    </div>
  );
}
