import React from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState(null);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTag = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
    else{
      setError('Tag already exists');
      setTimeout(() => {
        setError(null);
        setInputValue('');
      }, 2000);
    }
};

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (  // Corrected the length check and condition
        <div className="flex flex-wrap gap-2">  {/* Added gap for better spacing */}
          {tags.map((tag, index) => (  // Added return statement here
            <span key={index} className="flex items-center gap-1 border px-2 py-1 rounded bg-gray-200">
              # {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose className='text-2xl text-red-700 hover:text-white' />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className='flex items-center gap-4 mt-3'>
        <input
          type='text'
          placeholder='Add Tags'
          className='text-sm bg-transparent outline-none border px-3 py-2 rounded'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}  // Ensure the input reflects the state
        />
        <button onClick={addTag} className='w-8 h-8 flex items-center justify-center border border-blue-700 rounded hover:bg-blue-700'>
          <MdAdd className='text-2xl text-blue-700 hover:text-white' />
        </button>
        
      </div>
      {error && <p className='text-red-600 text-xs pb-1 pt-4'>{error}</p>}
    </div>
  );
};

export default TagInput;
