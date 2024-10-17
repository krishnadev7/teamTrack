import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, Search, Settings, ShieldAlert, User, Users2, X } from "lucide-react";
import Image from "next/image";
import SidebarLinks from "./SidebarLinks";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useState } from "react";
import { setPriority } from "os";
import { useGetProjectsQuery } from "@/state/api";



const Sidebar = () => {

    const [showProjects, setShowProjects] = useState<boolean>(false);
    const [showPriorties, setShowPriorties] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const { data: projects } = useGetProjectsQuery();

    return (
        <div className={`sidebarClassNames ${isSidebarCollapsed ? 'hidden w-0' : 'w-64'}`}>
            <div className="flex w-full h-[100%] flex-col justify-start">
                {/* Top Logo */}
                <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
                    <div className="text-xl font-bold text-gray-800 dark:text-white">
                        teamTrack
                    </div>
                    {isSidebarCollapsed ? null : (
                        <button className="py-3" onClick={() => { dispatch(setIsSidebarCollapsed(!isSidebarCollapsed)) }}>
                            <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
                        </button>
                    )}
                </div>


                {/* Team */}
                <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={40}
                        height={40}
                    />
                    <div>
                        <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                            KRISH'S TEAM
                        </h3>
                        <div className="mt-1 flex items-start gap-2">
                            <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                            <p className="text-xs text-gray-500">Private</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Links */}
                <nav className="z-10 w-full">
                    <SidebarLinks icon={Home} href="/" label="Home" />
                    <SidebarLinks icon={Briefcase} href="/timeline" label="Timeline" />
                    <SidebarLinks icon={Search} href="/search" label="Search" />
                    <SidebarLinks icon={Settings} href="/settings" label="Settings" />
                    <SidebarLinks icon={User} href="/users" label="Users" />
                    <SidebarLinks icon={Users2} href="/teams" label="Teams" />
                </nav>

                {/* Project Links */}
                <button onClick={() => setShowProjects(prev => !prev)} className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
                    <span className="">Projects</span>
                    {showProjects ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : <ChevronDown className="h-5 w-5" />}
                </button>

                {/* Project List */}
                {showProjects && projects?.map((project) => (
                    <SidebarLinks
                        key={project.id}
                        icon={Briefcase}
                        label={project.name}
                        href={`/projects/${project.id}`}
                    />
                ))}

                {/* Priorities Links */}
                <button onClick={() => setShowPriorties(prev => !prev)} className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
                    <span className="">Priority</span>
                    {showPriorties ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : <ChevronDown className="h-5 w-5" />}
                </button>
                {showPriorties && (
                    <>
                        <SidebarLinks
                            icon={AlertCircle}
                            label="Urgent"
                            href="/priority/urgent"
                        />
                        <SidebarLinks
                            icon={ShieldAlert}
                            label="High"
                            href="/priority/high"
                        />
                        <SidebarLinks
                            icon={AlertTriangle}
                            label="Medium"
                            href="/priority/medium"
                        />
                        <SidebarLinks icon={AlertOctagon} label="Low" href="/priority/low" />
                        <SidebarLinks
                            icon={Layers3}
                            label="Backlog"
                            href="/priority/backlog"
                        />
                    </>
                )}

            </div>

        </div>
    )
}

export default Sidebar;