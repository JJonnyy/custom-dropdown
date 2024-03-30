import React, { useState, useEffect, useRef } from 'react';

const CustomDropdown = ({ options, renderSelectedItem, updateOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);
  const [newItem, setNewItem] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedOption !== null) {
      setSearchTerm('');
      setIsOpen(false);
    }
  }, [selectedOption]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = options.filter(option =>
      option.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      const updatedOptions = [...options, newItem];
      updateOptions(updatedOptions);
      setSelectedOption(newItem);
      setNewItem('');
    }
  };

  return (
    <div ref={dropdownRef} className="w-full relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            onClick={handleToggle}
          >
            {renderSelectedItem(selectedOption)}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 12l-6-6H4l6 6 6-6h1l-6 6-6-6h1l6 6z" clipRule="evenodd" />
            </svg>
          </button>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Пошук..."
              className="w-full px-3 py-2 bg-white border-b border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm"
            />
            <ul>
              {filteredOptions.map(option => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 text-sm leading-5 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                >
                  {option}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Додати новий елемент..."
                className="w-full px-3 py-2 bg-white border-b border-gray-200 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm"
              />
              <button
                onClick={handleAddItem}
                className="mt-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
