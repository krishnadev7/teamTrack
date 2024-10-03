import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetTaskQuery } from "@/state/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};


const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
        />
      </div>
      <Table className="bg-white dark:bg-dark-secondary shadow-lg rounded-md">
        <TableHeader className="bg-gray-100 dark:bg-dark-tertiary">
          <TableRow>
            <TableHead className="dark:text-white">Title</TableHead>
            <TableHead className="dark:text-white">Description</TableHead>
            <TableHead className="dark:text-white">Status</TableHead>
            <TableHead className="dark:text-white">Priority</TableHead>
            <TableHead className="dark:text-white">Tags</TableHead>
            <TableHead className="dark:text-white">StartDate</TableHead>
            <TableHead className="dark:text-white">DueDate</TableHead>
            <TableHead className="dark:text-white">Author</TableHead>
            <TableHead className="dark:text-white">Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}
            className="hover:bg-gray-100 dark:hover:bg-dark-tertiary"
            >
              <TableCell  className="dark:text-white">{task.title}</TableCell>
              <TableCell  className="dark:text-white">{task.description}</TableCell>
              <TableCell className="flex text-center justify-center rounded-full bg-green-100 mt-3 p-2 text-xs font-semibold text-green-800">{task.status}</TableCell>
              <TableCell  className="dark:text-white">{task.priority}</TableCell>
              <TableCell  className="dark:text-white">{task.tags}</TableCell>
              <TableCell  className="dark:text-white">{task.startDate}</TableCell>
              <TableCell  className="dark:text-white">{task.dueDate}</TableCell>
              <TableCell  className="dark:text-white">{task.author?.username ? task.author.username : "Unknown"}</TableCell>
              <TableCell  className="dark:text-white">{task.assignee?.username ? task.assignee.username : "Unassigned"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableView