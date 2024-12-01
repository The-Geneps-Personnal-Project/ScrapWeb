import React from "react";
// import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="bg-header-color text-white p-4 fixed top-0 left-0 w-full z-20 flex justify-between items-center">
            <h1 className="text-2xl">Tachy Scrapy</h1>
            {/* <nav className="flex space-x-4">
                <Link
                    to="/"
                    className="px-4 py-2 bg-header-color hover:bg-sidebar-color text-white rounded transition-colors duration-300"
                >
                    Mangas
                </Link>
                <Link
                    to="/sites"
                    className="px-4 py-2 bg-header-color hover:bg-sidebar-color text-white rounded transition-colors duration-300"
                >
                    Sites
                </Link>
            </nav> */}
        </header>
    );
};

export default Header;
