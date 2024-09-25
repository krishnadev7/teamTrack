import { useGetTaskQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, Plus } from "lucide-react";
import { format } from 'date-fns'

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


type TaskColumnProps = {
    status: string,
    tasks: TaskType[],
    moveTask: (taskId: number, ToStatus: string) => void,
    setIsModalNewTaskOpen: (isOpen: boolean) => void,
}

const TaskColumn = ({ status, tasks, moveTask, setIsModalNewTaskOpen }: TaskColumnProps) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item: { id: number }) => moveTask(item.id, status),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const taskCount = tasks.filter((task) => task.status === status).length;

    const statusColor: any = {
        "To Do": "#2563EB",
        "Work In Progress": "#059669",
        "Under Review": "#D97706",
        Completed: "#000000",
    };

    return (
        <div
            ref={(instance) => {
                drop(instance);
            }}
            className={`sm:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
        >
            <div className="mb-3 flex w-full">
                <div
                    className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
                    style={{ backgroundColor: statusColor[status] }}
                />
                <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
                    <h3 className="flex items-center text-lg font-semibold dark:text-white">
                        {status}{" "}
                        <span
                            className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                            {taskCount}
                        </span>
                    </h3>
                    <div className="flex items-center gap-1">
                        <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                            <EllipsisVertical size={26} />
                        </button>
                        <button
                            className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
                            onClick={() => setIsModalNewTaskOpen(true)}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>
            {tasks.filter((task) => task.status === status).map((task) => (
                <Task
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    )
}

type TaskProps = {
    task: TaskType;
}

const Task = ({ task }: TaskProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    const taskSplit = task.tags ? task.tags.split(",") : [];

    const formatStartDate = task.startDate ? format(new Date(task.startDate), "P") : ""
    const formatDueDate = task.dueDate ? format(new Date(task.dueDate), "P") : ""

    const numberOfComments = (task.comments && task.comments.length) || 0

    const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
        <div
            className={`rounded-full px-2 py-1 text-xs font-semibold ${priority === "Urgent"
                ? "bg-red-200 text-red-700"
                : priority === "High"
                    ? "bg-yellow-200 text-yellow-700"
                    : priority === "Medium"
                        ? "bg-green-200 text-green-700"
                        : priority === "Low"
                            ? "bg-blue-200 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                }`}
        >
            {priority}
        </div>
    )
    
}

export default BoardView