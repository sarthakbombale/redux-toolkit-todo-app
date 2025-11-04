import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddForm from "./AddForm";
import { deleteTodo, toggleTodo } from "../features/todo/todoSlice";
import { Container, ListGroup, Button, Card } from "react-bootstrap";
import { FaTrashAlt, FaCheckCircle, FaMoon, FaSun } from "react-icons/fa";

export default function Todo() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  const handleDelete = (id) => dispatch(deleteTodo(id));
  const handleToggle = (id) => dispatch(toggleTodo(id));
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Theme-based styles
  const isDark = theme === "dark";
  const bgGradient = isDark
    ? "linear-gradient(135deg, #232526, #414345)"
    : "linear-gradient(135deg, #a1c4fd, #c2e9fb)";
  const cardBg = isDark ? "rgba(40, 44, 52, 0.9)" : "rgba(255, 255, 255, 0.85)";
  const textColor = isDark ? "#f8f9fa" : "#212529";

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: bgGradient,
        color: textColor,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Card
        className="p-4 shadow-lg rounded-4 w-100"
        style={{
          maxWidth: "500px",
          background: cardBg,
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          transition: "all 0.3s ease-in-out",
          color: textColor,
        }}
      >
       
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            className={`fw-bold mb-0 ${
              isDark ? "text-info" : "text-primary"
            }`}
          >
            📝 My Todo List
          </h2>
          <Button
            variant={isDark ? "outline-light" : "outline-dark"}
            size="sm"
            onClick={toggleTheme}
            className="d-flex align-items-center"
            style={{ gap: "6px" }}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </Button>
        </div>

        {/* Add Form */}
        <AddForm />

        {/* Todo List */}
        <ListGroup variant="flush">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <ListGroup.Item
                key={todo.id}
                className={`d-flex justify-content-between align-items-center mb-2 rounded-3 shadow-sm px-3 py-2 ${
                  todo.completed
                    ? isDark
                      ? "bg-success-subtle text-light"
                      : "bg-success-subtle text-dark"
                    : isDark
                    ? "bg-dark text-light"
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
                    color: todo.completed ? "#6c757d" : textColor,
                  }}
                >
                  {todo.task}
                </span>
                <div className="d-flex gap-2">
                  <Button
                    variant={
                      todo.completed
                        ? "outline-secondary"
                        : isDark
                        ? "outline-light"
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
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
         <p
  className="text-center mt-3 mb-0"
  style={{
    color: isDark ? "#dee2e6" : "#6c757d",
    transition: "color 0.3s ease",
  }}
>
  No tasks yet — start adding one! 🚀
</p>

          )}
        </ListGroup>
      </Card>
    </Container>
  );
}
