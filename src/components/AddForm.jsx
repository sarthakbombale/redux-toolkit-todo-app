import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function AddForm() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (!task.trim()) return;
    dispatch(addTodo(task));
    setTask("");
  };

  return (
    <Form onSubmit={submitHandler} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </InputGroup>
    </Form>
  );
}
