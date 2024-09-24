import { useGetTaskQuery } from "@/state/api";

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskStatus = ['To Do', 'Work In Progress', 'Under Review', 'Completed'];

const BoardView = ({ id, setIsModalNewTaskOpen }: Props) => {
    const { data: tasks, isLoading, error } = useGetTaskQuery({ projectId: Number(id) })
    return (
        <div>BoardView</div>
    )
}

export default BoardView