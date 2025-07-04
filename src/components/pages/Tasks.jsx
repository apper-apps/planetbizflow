import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MetricCard from '@/components/molecules/MetricCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import StatusPill from '@/components/molecules/StatusPill';
import ApperIcon from '@/components/ApperIcon';
import { taskService } from '@/services/api/taskService';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskService.update(taskId, { status: newStatus });
      setTasks(tasks.map(task => 
        task.Id === taskId ? { ...task, status: newStatus } : task
      ));
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const calculateTaskMetrics = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'todo').length;
    const inProgressTasks = tasks.filter(t => t.status === 'inProgress').length;
    const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
    const overdueTasks = tasks.filter(t => {
      const dueDate = new Date(t.dueDate);
      return isPast(dueDate) && t.status !== 'completed';
    }).length;

    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      highPriorityTasks,
      overdueTasks,
      completionRate
    };
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const groupedTasks = {
    overdue: filteredTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return isPast(dueDate) && task.status !== 'completed';
    }),
    today: filteredTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return isToday(dueDate) && task.status !== 'completed';
    }),
    tomorrow: filteredTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return isTomorrow(dueDate) && task.status !== 'completed';
    }),
    upcoming: filteredTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return !isPast(dueDate) && !isToday(dueDate) && !isTomorrow(dueDate) && task.status !== 'completed';
    }),
    completed: filteredTasks.filter(task => task.status === 'completed')
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertCircle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const TaskCard = ({ task, isOverdue = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-200 ${
        isOverdue ? 'border-l-4 border-red-500' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateTaskStatus(task.Id, 
              task.status === 'completed' ? 'todo' : 'completed'
            )}
            className={`p-1 rounded-full transition-colors ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <ApperIcon name={task.status === 'completed' ? 'CheckCircle' : 'Circle'} className="h-5 w-5" />
          </button>
          <div>
            <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getPriorityColor(task.priority)}`}>
            <ApperIcon name={getPriorityIcon(task.priority)} className="h-4 w-4" />
            <span className="text-xs font-medium capitalize">{task.priority}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {task.category}
          </span>
        </div>
        <StatusPill status={task.status} type="task" />
      </div>
    </motion.div>
  );

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  const metrics = calculateTaskMetrics();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Stay organized and track your daily operations</p>
        </div>
        <Button
          variant="accent"
          icon="Plus"
          onClick={() => setShowAddModal(true)}
        >
          Add Task
        </Button>
      </div>

      {/* Task Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Tasks"
          value={metrics.totalTasks}
          icon="CheckSquare"
          trend="up"
          trendValue={`${metrics.completionRate}% completed`}
          gradient="from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Pending Tasks"
          value={metrics.pendingTasks}
          icon="Clock"
          trend="up"
          trendValue={`${metrics.inProgressTasks} in progress`}
          gradient="from-yellow-500 to-orange-600"
        />
        <MetricCard
          title="High Priority"
          value={metrics.highPriorityTasks}
          icon="AlertCircle"
          trend="down"
          trendValue="Urgent tasks"
          gradient="from-red-500 to-pink-600"
        />
        <MetricCard
          title="Overdue"
          value={metrics.overdueTasks}
          icon="AlertTriangle"
          trend="down"
          trendValue="Past due"
          gradient="from-purple-500 to-violet-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Priority:</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Groups */}
      {tasks.length === 0 ? (
        <Empty
          icon="CheckSquare"
          title="No tasks yet"
          description="Start organizing your work by adding your first task."
          actionText="Add Task"
          onAction={() => setShowAddModal(true)}
        />
      ) : (
        <div className="space-y-6">
          {/* Overdue Tasks */}
          {groupedTasks.overdue.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                <ApperIcon name="AlertTriangle" className="h-5 w-5 mr-2" />
                Overdue ({groupedTasks.overdue.length})
              </h2>
              <div className="space-y-3">
                {groupedTasks.overdue.map((task) => (
                  <TaskCard key={task.Id} task={task} isOverdue={true} />
                ))}
              </div>
            </div>
          )}

          {/* Today's Tasks */}
          {groupedTasks.today.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                <ApperIcon name="Calendar" className="h-5 w-5 mr-2" />
                Today ({groupedTasks.today.length})
              </h2>
              <div className="space-y-3">
                {groupedTasks.today.map((task) => (
                  <TaskCard key={task.Id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Tomorrow's Tasks */}
          {groupedTasks.tomorrow.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                <ApperIcon name="Calendar" className="h-5 w-5 mr-2" />
                Tomorrow ({groupedTasks.tomorrow.length})
              </h2>
              <div className="space-y-3">
                {groupedTasks.tomorrow.map((task) => (
                  <TaskCard key={task.Id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Tasks */}
          {groupedTasks.upcoming.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-600 mb-4 flex items-center">
                <ApperIcon name="Calendar" className="h-5 w-5 mr-2" />
                Upcoming ({groupedTasks.upcoming.length})
              </h2>
              <div className="space-y-3">
                {groupedTasks.upcoming.map((task) => (
                  <TaskCard key={task.Id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {groupedTasks.completed.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-500 mb-4 flex items-center">
                <ApperIcon name="CheckCircle" className="h-5 w-5 mr-2" />
                Completed ({groupedTasks.completed.length})
              </h2>
              <div className="space-y-3">
                {groupedTasks.completed.map((task) => (
                  <TaskCard key={task.Id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;