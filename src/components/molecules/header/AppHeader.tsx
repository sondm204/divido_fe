import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

type AppHeaderProps = {}

export const AppHeader = React.memo((props: AppHeaderProps) => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDark = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="relative w-full px-6 py-4 shadow-md dark:bg-gray-900 dark:text-white bg-white flex justify-between items-center z-10">
            {/* Logo */}
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                <Link to="/">Divido</Link>
            </div>

            {/* Menu */}
            <nav className="space-x-6">
                <Link to="/home" className="hover:text-blue-500 dark:hover:text-blue-300">
                    Trang chủ
                </Link>
                <Link to="/expenses" className="hover:text-blue-500 dark:hover:text-blue-300">
                    Chi tiêu
                </Link>
                <Link to="/contact" className="hover:text-blue-500 dark:hover:text-blue-300">
                    Liên hệ
                </Link>
            </nav>

            {/* Avatar + Toggle Theme */}
            <div className="flex items-center space-x-4">
                {/* Avatar giả lập */}
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                    <img
                        src="https://i.pravatar.cc/100" // Ảnh avatar mẫu
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Toggle Light/Dark */}
                <button
                    onClick={toggleDark}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-transform"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>
    );
})