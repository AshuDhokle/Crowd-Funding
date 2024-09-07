import React, { useState, useContext } from 'react';
import { CrowdFundingContext } from '../../context/crowdFundingContext';

const CreateCampaignForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [target, setTarget] = useState('');
  const { createCampaign } = useContext(CrowdFundingContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(name, description, image, target);
      // Clear the form fields
      setName('');
      setDescription('');
      setImage('');
      setTarget('');
      alert('Campaign added successfully!');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to add campaign.');
    }
  };

  return (
    <div className="container mx-auto lg:w-1/3 px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Add New Campaign</h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium mb-2">Campaign Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded text-black"
            placeholder="Enter campaign name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded text-black"
            placeholder="Enter campaign description"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium mb-2">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 w-full rounded text-black"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="target" className="block text-lg font-medium mb-2">Target Amount (ETH)</label>
          <input
            type="number"
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border p-2 w-full rounded text-black"
            placeholder="Enter target amount"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaignForm;
