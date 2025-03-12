import { Button, Checkbox, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { TaskContext } from "../App";

function AllActiveTab({ filter }) {
  const { tasks, addTask, toggleTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  const filteredTasks =
    filter === "active" ? tasks.filter((task) => task.active) : tasks;

  return (
    <div className="my-[30px]">
      <div className="flex gap-3 my-[20px]">
        <Input
          placeholder="Add details"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask}>
          Add
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {filteredTasks.map((task) => (
          <Checkbox
            key={task.id}
            checked={!task.active}
            onChange={() => toggleTask(task.id)}
            className={task.active ? "" : "line-through text-gray-500"}
          >
            {task.text}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default AllActiveTab;
