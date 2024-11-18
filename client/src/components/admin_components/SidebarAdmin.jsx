import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, SquareChartGantt, ChartColumnStacked, PackageSearch, LogOut    } from 'lucide-react';

const SidebarAdmin = () => {
    return (
        <div className='bg-blue-gray-800 w-64 text-gray-100 flex flex-col h-screen'>

            <div className='h-24 bg-blue-gray-900 flex items-center justify-center text-2xl font-bold'>
                Admin Panel
            </div>

            <nav className='flex-1 p-4 space-y-2'>

                <NavLink
                    to={'/admin'}
                    end
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-gray-900 text-white flex items-center px-4 py-2 rounded'
                            : 'text-blue-gray-300 hover:bg-blue-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }>
                    <LayoutDashboard className='mr-2' />
                    Dashboard
                </NavLink>

                <NavLink
                    to={'manage'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-gray-900 text-white flex items-center px-4 py-2 rounded'
                            : 'text-blue-gray-300 hover:bg-blue-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }>
                    <SquareChartGantt className='mr-2' />
                    Manage
                </NavLink>

                <NavLink
                    to={'category'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-gray-900 text-white flex items-center px-4 py-2 rounded'
                            : 'text-blue-gray-300 hover:bg-blue-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }>
                    <ChartColumnStacked className='mr-2' />
                    Category
                </NavLink>

                <NavLink
                    to={'product'}
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-gray-900 text-white flex items-center px-4 py-2 rounded'
                            : 'text-blue-gray-300 hover:bg-blue-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }>
                    <PackageSearch className='mr-2' />
                    Product
                </NavLink>

            </nav>

            <div>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-gray-900 text-white flex items-center px-4 py-2 rounded'
                            : 'text-blue-gray-300 hover:bg-blue-gray-700 hover:text-white rounded flex items-center px-4 py-2'
                    }>
                    <LogOut className='mr-2' />
                    Logout
                </NavLink>
            </div>

        </div>
    )
}

export default SidebarAdmin