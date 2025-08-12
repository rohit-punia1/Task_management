"use client";

import { useState } from "react";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
import { getTasks } from "@/lib/task/taskapis";
import TaskCard from "@/components/TaskCard";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/Error";

export default function Tasks(props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const debouncedSearch = useDebounce(search, 500);

  const handleTaskClick = (task) => {
    if (task) router.push(`/tasks/${task.id}`);
  };

  const { data: tasks = [], error, isLoading } = useSWR(["/todos"], getTasks);

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

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <ErrorMessage message={error.message} />
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task List</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table/Grid */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-3">No tasks found.</div>
      ) : (
        <div className="overflow-x-auto  ">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
