import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard/Index";
import { useGetTaskQuery } from "@/state/api";

type ListViewProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void
}

const ListView = ({ id, setIsModalNewTaskOpen }: ListViewProps) => {
    const { data: tasks, error, isLoading } = useGetTaskQuery({ projectId: Number(id) });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>An error occured when fetching tasks...</div>
    }

    return (
        <div className="px-4 pb-8 xl:px-6">
            <div className="pt-5">
                <Header name="List" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
            </div>
        </div>
    )
}

export default ListView