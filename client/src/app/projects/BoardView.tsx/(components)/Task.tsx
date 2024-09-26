import { format } from "date-fns";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";
import Image from "next/image";
import { useDrag } from "react-dnd";
import { Task as TaskType } from "@/state/api";


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

    const taskTagSplit = task.tags ? task.tags.split(",") : [];

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
    return (
        <div
            ref={(instance) => { drag(instance) }}
            className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            {task.attachments && task.attachments.length > 0 && (
                <Image
                    src={`/${task.attachments[0].fileUrl}`}
                    alt={task.attachments[0].fileName}
                    width={400}
                    height={200}
                    className="h-auto w-full rounded-t-md"
                />
            )}
            <div className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        {task.priority && <PriorityTag priority={task.priority} />}
                        <div className="flex gap-2">
                            {taskTagSplit.map((tag) => (
                                <div key={tag} className="rounded-full bg-blue-100 px-2 py-1 text-xs">
                                    {" "}
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
                        <EllipsisVertical size={26} />
                    </button>
                </div>

                <div className="my-3 justify-between flex">
                    <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
                    {typeof task.points === 'number' && (
                        <div className="text-xs font-semibold dark:text-white">
                            {task.points} pts
                        </div>
                    )}
                </div>

                <div className="text-xs text-gray-500 dark:text-neutral-500">
                    {formatStartDate && <span>{formatStartDate} - </span>}
                    {formatDueDate && <span>{formatDueDate} - </span>}
                </div>

                <p className="text-sm text-gray-600 dark:text-neutral-500">
                    {task.description}
                </p>

                <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark">
                    {/* Users  */}
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex -space-x-[6px] overflow-hidden">
                            {task.assignee && (
                                <Image
                                    key={task.assignee.userId}
                                    src={`/${task.assignee.profilePictureUrl!}`}
                                    alt={task.assignee.username}
                                    width={30}
                                    height={30}
                                    className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                                />
                            )}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-neutral-500">
                            <MessageSquareMore size={20} />
                            <span className="ml-1 text-sm dark:text-neutral-500">{numberOfComments}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Task