import Header from "@/components/Header";
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
                <Header name="List"/>
            </div>
        </div>
    )
}

export default ListView