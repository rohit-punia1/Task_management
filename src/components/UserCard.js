export default function UserCard({ user }) {
  return (
    <div className=" bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition cursor-default">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">{user.name}</h2>
      <p className="text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Email:</span> {user.email}
      </p>
      <p className="text-gray-600">
        <span className="font-medium text-gray-800">Company:</span>{" "}
        {user.company?.name || "N/A"}
      </p>
    </div>
  );
}
