import { useState, useRef } from 'react';

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TechNewsWidget from './TechNewsWidget';

import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { user, logout } = useAuth();
  const taskListRef = useRef();

  const handleLogout = () => {
    logout();
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = () => {
    setShowTaskForm(false);
    setEditingTask(null);

    // Refresh tasks inside TaskList component
    taskListRef.current?.refresh();
  };

  const handleCancelTask = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user.name}!
            </h1>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <TaskList 
              ref={taskListRef}
              onEditTask={handleEditTask}
              onAddTask={handleAddTask}
            />
          </div>
          <div className="lg:col-span-1">
            <TechNewsWidget />
          </div>
        </div>
      </main>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={handleCancelTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
