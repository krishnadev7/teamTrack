"use client";

import { useState } from "react";
import ProjectHeader from "../ProjectHeader";
import BoardView from "../BoardView.tsx/Index";

type Props = {
    params: { id: string };
}

const Project = ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState('Board');
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    return (
        <div>
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'Board' && (
                <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
        </div>
    )
}

export default Project