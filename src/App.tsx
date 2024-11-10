import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Add Email") });
  }

  return (
    <main>
      <h1>Welcome to Yort and Associates LLC</h1>
      <button onClick={createTodo}>Sign up for Newsletter</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 This site is temporarily under construction. For further information on Yort and Associates, email info@yortassociates.com
        <br />
      </div>
    </main>
  );
}

export default App;
