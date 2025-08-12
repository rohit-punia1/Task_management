"use client";

import useSWR from "swr";
import axios from "axios";
import { useParams } from "next/navigation";
import { getTaskById } from "@/lib/task/taskapis";
import { getUserById } from "@/lib/task/userapi";
import TaskCard from "@/components/TaskCard";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/Error";

export default function TaskDetailPage() {
  const { id } = useParams();

  // Fetch task details
  const {
    data: task,
    error: taskError,
    isLoading: taskLoading,
  } = useSWR([`/task/${id}`], () => getTaskById(id));

  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useSWR(task?.data?.userId ? task.data.userId : null, () =>
    getUserById(task.data.userId)
  );

  if (taskLoading || userLoading) {
    return <Loading />;
  }

  if (taskError) {
    return (
      <ErrorMessage message={taskError.message} />
    );
  }

  if (task?.data ? Object.keys(task?.data).length === 0 : true) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">No task found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6  ">
      <h1 className="text-3xl font-bold mb-6">Task List</h1>
      <TaskCard task={task.data} />

      <div className="border-t pt-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Assigned User</h2>
        <p>
          <span className="font-semibold">Name:</span> {user?.data?.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user?.data?.email}
        </p>
        <p>
          <span className="font-semibold">Company:</span>{" "}
          {user?.data?.company?.name}
        </p>
      </div>
    </div>
  );
}
