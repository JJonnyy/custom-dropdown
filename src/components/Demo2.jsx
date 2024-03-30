import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';

const DemoApp = () => {
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [selectedColors, setSelectedColors] = useState(Array(options.length).fill('black'));
  const [selectedSizes, setSelectedSizes] = useState(Array(options.length).fill('1rem'));
  const [newOption, setNewOption] = useState('');

  const handleSelect = (option, index) => {
    console.log(`Selected ${option} for dropdown ${index + 1}`);
  };

  const handleColorChange = (index, color) => {
    setSelectedColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  const handleSizeChange = (index, size) => {
    setSelectedSizes(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index] = size;
      return newSizes;
    });
  };

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptions(prevOptions => [...prevOptions, newOption]);
      setNewOption('');
    }
  };

  const renderSelectedItem = (option, color, size, index) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold" style={{ fontSize: size, color: color }}>
          {option ? option : 'Select an option'}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="New option"
          className="px-3 py-1 mr-2 border border-gray-300 rounded"
        />
        <button onClick={handleAddOption} className="px-3 py-1 bg-blue-500 text-white rounded">
          Add Option
        </button>
      </div>
      {options.map((option, index) => (
        <div key={index} className="relative mr-4">
          <div className="mb-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2" onClick={() => handleColorChange(index, 'blue')}>
              Blue
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded mr-2" onClick={() => handleColorChange(index, 'red')}>
              Red
            </button>
            <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => handleColorChange(index, 'green')}>
              Green
            </button>
          </div>
          <div>
            <button className="px-3 py-1 bg-gray-500 text-white rounded mr-2" onClick={() => handleSizeChange(index, '1rem')}>
              Small
            </button>
            <button className="px-3 py-1 bg-gray-500 text-white rounded" onClick={() => handleSizeChange(index, '1.5rem')}>
              Large
            </button>
          </div>
          <CustomDropdown
            options={options}
            renderSelectedItem={(selectedOption) => (
              renderSelectedItem(selectedOption, selectedColors[index], selectedSizes[index], index)
            )}
            onSelect={(option) => handleSelect(option, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default DemoApp;
