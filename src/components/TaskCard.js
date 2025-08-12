export default function TaskCard({ task, onClick }) {
  return (
    <div
      className="p-4  rounded-md shadow-lg hover:shadow-xl transition  h-full"
      onClick={onClick}
    >
      <h2 className="font-bold">{task?.title}</h2>
      <p>
        Status:{" "}
        <span
          className={
            task?.completed
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {task?.completed!==undefined ? (task?.completed ? "Completed" : "Pending") : ""}
        </span>
      </p>
    </div>
  );
}
