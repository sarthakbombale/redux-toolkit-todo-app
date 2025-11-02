import { useDispatch, useSelector } from "react-redux";
import AddForm from "./components/AddForm";
import { deleteTodo, toggleTodo } from "../features/todo/todoSlice";
import { Container, ListGroup, Button, Card } from "react-bootstrap";
import { FaTrashAlt, FaCheckCircle } from "react-icons/fa";

export default function Todo() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
      }}
    >
      <Card
        className="p-4 shadow-lg rounded-4 w-100"
        style={{
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          border: "none",
        }}
      >
        <h2 className="text-center text-primary fw-bold mb-4">
          📝 My Todo List
        </h2>

        <AddForm />

        <ListGroup variant="flush">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <ListGroup.Item
                key={todo.id}
                className={`d-flex justify-content-between align-items-center mb-2 rounded-3 shadow-sm px-3 py-2 ${
                  todo.completed
                    ? "bg-success-subtle"
                    : "bg-light text-dark"
                }`}
                style={{
                  transition: "all 0.3s ease",
                  borderLeft: todo.completed
                    ? "5px solid #198754"
                    : "5px solid #0d6efd",
                }}
              >
                <span
                  style={{
                    fontWeight: "500",
                    flex: 1,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#6c757d" : "#212529",
                  }}
                >
                  {todo.task}
                </span>
                <div className="d-flex gap-2">
                  <Button
                    variant={
                      todo.completed
                        ? "outline-secondary"
                        : "outline-success"
                    }
                    size="sm"
                    onClick={() => handleToggle(todo.id)}
                    className="d-flex align-items-center"
                    style={{ gap: "4px" }}
                  >
                    <FaCheckCircle />
                    {todo.completed ? "Undo" : "Done"}
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(todo.id)}
                    className="d-flex align-items-center"
                    style={{ gap: "4px" }}
                  >
                    <FaTrashAlt />
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-center text-muted mt-3 mb-0">
              No tasks yet — start adding one! 🚀
            </p>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
}