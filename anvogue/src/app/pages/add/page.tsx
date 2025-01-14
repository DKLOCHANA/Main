import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white shadow-lg">
                <ul className="py-4">
                    <li className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Product Catalog</li>
                    <li className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Reviews</li>
                    <li className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Orders</li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome to the Admin Dashboard!</h1>
                <p className="mt-4 text-gray-600">
                    Use the sidebar to navigate through sections like Product Catalog, Reviews, and Orders.
                </p>
            </main>
        </div>
    );
};

export default Dashboard;
