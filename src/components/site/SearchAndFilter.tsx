import React, { useState } from "react";

interface SearchAndFilterProps {
    onSearch: (term: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <div className="flex items-center mb-4">
            <input
                type="text"
                placeholder="Search by site or manga..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-700 text-white p-2 rounded flex-1"
            />
        </div>
    );
};

export default SearchAndFilter;
