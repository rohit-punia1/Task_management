var APIMapping = {
  getTask: "https://jsonplaceholder.typicode.com/todos",
  getTaskById: "https://jsonplaceholder.typicode.com/todos/{taskId}",
  getUserById: "https://jsonplaceholder.typicode.com/users/{userId}",
};

function getAPIMap(name) {
  return APIMapping[name];
}

export default getAPIMap;
