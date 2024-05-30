import React from "react";

const Header: React.FC = () => {
    return (
        <header className="bg-header-color text-white p-4 fixed top-0 left-0 w-full z-20 flex justify-between items-center">
            <h1 className="text-2xl">Site Name</h1>
        </header>
    );
};

export default Header;
