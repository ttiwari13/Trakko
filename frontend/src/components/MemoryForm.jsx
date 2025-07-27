import React, { useState } from 'react';

const MemoryForm = ({ latlng, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result); // base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, photo, latlng });
    setTitle('');
    setDescription('');
    setPhoto(null);
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded p-4 z-[1001] w-80">
      <h2 className="text-lg font-semibold mb-2">Add Memory</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="mb-2"
        />
        {photo && (
          <img src={photo} alt="Preview" className="mb-2 w-full rounded h-32 object-cover" />
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemoryForm;
