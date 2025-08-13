"use client";

import { useCallback, useState } from "react";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
import { getTasks } from "@/lib/task/taskapis";
import TaskCard from "@/components/TaskCard";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/Error";
import PageTitle from "@/components/PageTitle";
import { useTask } from "@/context/TaskConext";

export default function Tasks() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const { setTask } = useTask();

  const debouncedSearch = useDebounce(search, 500);

  const handleTaskClick = useCallback(
    (task) => {
      if (task) {
        
        router.push(`/tasks/${task.id}`);
      }
    },
    [router]
  );

  const {
    data: tasks = [],
    error,
    isLoading,
  } = useSWR(["/todos"], getTasks, {
    onSuccess:(data)=>{
      setTask(data.data);
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: Infinity,
  });

  const filteredTasks =
    debouncedSearch !== "" || status !== ""
      ? tasks?.data?.filter((task) => {
          const matchesSearch = task.title
            .toLowerCase()
            .startsWith(debouncedSearch.toLowerCase());
          const matchesStatus =
            status === "all" ||
            (status === "completed" && task.completed) ||
            (status === "pending" && !task.completed);
          return matchesSearch && matchesStatus;
        })
      : [];

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageTitle title="Task List" />
      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row gap-4 mb-8 border border-gray-100">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg w-full sm:w-1/2 outline-none transition"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg w-full sm:w-1/4 outline-none transition"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border">
          No tasks found. Try changing your filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-100"
              onClick={() => handleTaskClick(task)}
            >
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
