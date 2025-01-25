import { ITask } from "../../../types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <Task key={task.id || `task-${index}`} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
