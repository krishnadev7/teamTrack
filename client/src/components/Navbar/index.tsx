import { useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    return <div className="flex items-center py-3 px-4 justify-between bg-white dark:bg-black dark:px-4 dark:py-3">
        {/* Search bar */}
        <div className="flex items-center gap-8">
            {!isSidebarCollapsed ? null : (
                <button
                    onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
                >
                    <Menu className="h-8 w-8 dark:text-white" />
                </button>
            )}
            <div className="relative h-min flex w-[200px]">
                <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
                <input type="text" placeholder="Search..." className="w-full rounded border-none bg-gray-100 p-2 pl-8
                 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
                />
            </div>
        </div>

        {/* Icons */}
        <div className="flex items-center">
            <button
                onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                className={`${isDarkMode ? 'rounded p-2 dark:hover:bg-gray-700' : 'rounded p-2 hover:bg-gray-100'}`}
            >
                {isDarkMode ? (<Sun className="h-6 w-6 cursor-pointer dark:text-white" />) : (<Moon className="h-6 w-6 cursor-pointer dark:text-white" />)}
            </button>
            <Link href={'/settings'} className={`${isDarkMode ? 'rounded h-min w-min p-2 dark:hover:bg-gray-700' : 'h-min w-min rounded p-2 hover:bg-gray-100'}`}>
                <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
            </Link>
            <div className="hidden md:inline-block ml-2 mr-5 min-h-[2em] w-[0.1rem] bg-gray-200" />
        </div>
    </div>
}

export default Navbar;