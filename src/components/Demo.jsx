import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';

const options = ['Option 1', 'Option 2', 'Option 3'];
let allItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
const DemoApp = () => {
  const [selectedColors, setSelectedColors] = useState(Array(options.length).fill('black'));
  const [selectedSizes, setSelectedSizes] = useState(Array(options.length).fill('1rem'));

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

  const updateOptions = (newOptions) => {
    allItems = newOptions;
  };

  return (
    <div className="flex">
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
          <div className="mb-4">
            <button className="px-3 py-1 bg-gray-500 text-white rounded mr-2" onClick={() => handleSizeChange(index, '1rem')}>
              Small
            </button>
            <button className="px-3 py-1 bg-gray-500 text-white rounded" onClick={() => handleSizeChange(index, '1.5rem')}>
              Large
            </button>
          </div>
          <CustomDropdown
            options={allItems}
            renderSelectedItem={(selectedItem) => (
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold" style={{ fontSize: selectedSizes[index], color: selectedColors[index] }}>
                  {selectedItem ? selectedItem : 'Оберіть ваше місто'}
                </div>
              </div>
            )}
            updateOptions={updateOptions}
          />
        </div>
      ))}
    </div>
  );
};

export default DemoApp;
