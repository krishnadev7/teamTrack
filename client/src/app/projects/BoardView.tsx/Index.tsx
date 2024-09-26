import { useGetTaskQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./(components)/TaskColumn";

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskStatus = ['To Do', 'Work In Progress', 'Under Review', 'Completed'];

const BoardView = ({ id, setIsModalNewTaskOpen }: Props) => {
    const { data: tasks, isLoading, error } = useGetTaskQuery({ projectId: Number(id) })

    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const moveTask = (taskId: number, toStatus: string) => {
        updateTaskStatus({ taskId, status: toStatus });
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>An error occured when fetching tasks...</div>
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 xl:grid-cols-4">
                {TaskStatus.map((status) => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasks || []}
                        moveTask={moveTask}
                        setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                    />
                ))}
            </div>
        </DndProvider>
    )

}
export default BoardView