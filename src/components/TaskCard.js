export default function TaskCard({ task, onClick }) {
  return (
    <div
      className="p-4 border rounded-md shadow-sm hover:shadow-lg transition my-5"
      onClick={onClick}
    >
      <h2 className="font-bold">{task.title}</h2>
      <p>
        Status:{" "}
        <span
          className={
            task?.data?.completed
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </p>
    </div>
  );
}
