import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const TaskList = forwardRef(({ onEditTask, onAddTask }, ref) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setError('');
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: loadTasks
  }));

  const handleToggleStatus = async (taskId) => {
    try {
      const response = await axios.patch(`/api/tasks/${taskId}/toggle`);
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Error toggling task status:', error);
      setError('Failed to update task status');
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    onEditTask(task);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No tasks found.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      Task Name
                    </th>
                    <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                      Description
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                      Status
                    </th>
                    <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map(task => (
                    <tr key={task._id} className="hover:bg-gray-50">
                      <td className="px-2 py-4 whitespace-nowrap">
                        <span className={task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}>
                          {task.name}
                        </span>
                      </td>
                      <td className="px-2 py-4">
                        <span className={task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-700'}>
                          {task.description}
                        </span>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-center w-28">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {task.status === 'pending' ? 'Pending' : 'Completed'}
                        </span>
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-center w-32">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleToggleStatus(task._id)}
                            className={`w-8 h-8 rounded-md text-lg flex items-center justify-center transition-colors ${
                              task.status === 'pending'
                                ? 'bg-green-100 hover:bg-green-200 text-green-700'
                                : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                            }`}
                            title={task.status === 'pending' ? 'Mark as completed' : 'Mark as pending'}
                          >
                            {task.status === 'pending' ? '✓' : '○'}
                          </button>
                          <button
                            onClick={() => handleEdit(task)}
                            className="w-8 h-8 rounded-md text-base flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                            title="Edit this task"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="w-8 h-8 rounded-md text-base flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                            title="Delete this task"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {tasks.map(task => (
                <div key={task._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-medium ${
                      task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {task.name}
                    </h3>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(task._id)}
                        className={`w-6 h-6 rounded-md text-base flex items-center justify-center transition-colors ${
                          task.status === 'pending'
                            ? 'bg-green-100 hover:bg-green-200 text-green-700'
                            : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                        }`}
                        title={task.status === 'pending' ? 'Mark as completed' : 'Mark as pending'}
                      >
                        {task.status === 'pending' ? '✓' : '○'}
                      </button>
                      <button
                        onClick={() => handleEdit(task)}
                        className="w-6 h-6 rounded-md text-sm flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                        title="Edit this task"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="w-6 h-6 rounded-md text-sm flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                        title="Delete this task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-700'
                  }`}>
                    {task.description}
                  </p>
                  
                  <div className="flex justify-start">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      task.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.status === 'pending' ? 'Pending' : 'Completed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button 
            onClick={onAddTask} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
          >
            <span className="mr-2">+</span>
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
});

export default TaskList;
