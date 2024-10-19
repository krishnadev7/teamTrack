"use client"

import { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import AuthProvider from "./AuthProvider";

const DashboardLayout = ({ children }: { children: ReactNode }) => {

    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    });

    return (
        <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
            <Sidebar />
            <main className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 ${isSidebarCollapsed ? "" : "md:pl-64"}`}>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProvider>
            <AuthProvider>
                <DashboardLayout>{children}</DashboardLayout>
            </AuthProvider>
        </StoreProvider>
    )
}

export default DashboardWrapper;