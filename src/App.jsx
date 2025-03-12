import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import AllTab from "./components/All";
import ActiveTab from "./components/Active";
import CompletedTab from "./components/Completed";
import TabsMenu from "./components/Tabmenu";

export const TaskContext = createContext();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, active: true }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, active: !task.active } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const deleteAllCompleted = () => {
    setTasks(tasks.filter(task => task.active));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, deleteAllCompleted }}>
      <Router>
        <div className="w-[500px] mx-auto mt-[10%]">
          <h1 className="text-[32px] font-bold text-center py-[8px]">#todo</h1>
          <TabsMenu />
          <Routes>
            <Route path="/all" element={<AllTab />} />
            <Route path="/active" element={<ActiveTab />} />
            <Route path="/completed" element={<CompletedTab />} />
            <Route path="*" element={<Navigate to="/all" />} />
          </Routes>
        </div>
      </Router>
    </TaskContext.Provider>
  );
}
