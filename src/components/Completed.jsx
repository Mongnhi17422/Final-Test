import { useContext } from "react";
import { TaskContext } from "../App";
import { Button, Checkbox, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function CompletedTab() {
  const { tasks, toggleTask, deleteTask, deleteAllCompleted } = useContext(TaskContext);
  const completedTasks = tasks.filter(task => !task.active);

  return (
    <div className="mt-4">
      <div className="space-y-2 flex flex-col-reverse">
        {completedTasks.length > 0 ? (
          completedTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between">
              <Checkbox
                checked
                onChange={() => toggleTask(task.id)}
                className="line-through text-gray-500"
              >
                {task.text}
              </Checkbox>
              <Tooltip title="Delete task">
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => deleteTask(task.id)}
                />
              </Tooltip>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No completed tasks</p>
        )}
      </div>

      {completedTasks.length > 0 && (
        <Button className="mt-4 w-[100px] text-white bg-red-500" onClick={deleteAllCompleted}>
          Delete all
        </Button>
      )}
    </div>
  );
}

export default CompletedTab;
