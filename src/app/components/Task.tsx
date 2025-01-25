"use client";

import { FiEdit } from "react-icons/fi";
import { ITask } from "../../../types/tasks";
import { LuTrash2 } from "react-icons/lu";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../../api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr>
      <td>{task.text}</td>
      <td className="flex gap-5">
        {/* Edit Icon */}
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        {/* Edit Modal */}
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Icon */}
        <LuTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        {/* Delete Modal */}
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure?</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
