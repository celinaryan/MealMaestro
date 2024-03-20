import React, { useState } from 'react';

export default function RecipeForm() {
    const [files, setFiles] = useState([]);
    const [cookingTime, setCookingTime] = useState([0, 40]); // Example default range
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
  

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleLevelChange = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append('photos', file);
    });
    // Append other form data as necessary
    formData.append('cookingTime', cookingTime.join('-'));
    formData.append('cuisineType', selectedCuisines.join(', '));
    formData.append('cookingLevel', selectedLevels.join(', '));
  
    // POST to your Next.js API route
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    // Handle the response from your API route
    const data = await response.json();
    if (response.ok) {
      alert('Recipes fetched successfully!');
      // Process and display the recipes data
    } else {
      alert(`Failed to fetch recipes: ${data.error}`);
    }
  };

  return (
    <div className="recipe-form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">
          <h2>Upload Photo:</h2>
          <input multiple type="file" onChange={handleFileChange} accept="image/*" />
        </div>
        <div className="form-row">
          <h2>Cook Time Range: {cookingTime.join(' - ')} min</h2>
          <input type="range" min="10" max="120" value={cookingTime[1]} onChange={(e) => setCookingTime([cookingTime[0], e.target.value])} />
        </div>
        <div className="form-row">
          <h2>Cuisine Type:</h2>
          <div className="checkbox-group">
            {['Italian', 'Mexican', 'Asian', 'American'].map((cuisine) => (
              <label key={cuisine}>
                <input type="checkbox" value={cuisine} onChange={() => handleCuisineChange(cuisine)} checked={selectedCuisines.includes(cuisine)} />
                {cuisine}
              </label>
            ))}
          </div>
        </div>
        <div className="form-row">
          <h2>Cooking Level:</h2>
          <div className="checkbox-group">
            {['Beginner', 'Intermediate', 'Expert'].map((level) => (
              <label key={level}>
                <input type="checkbox" value={level} onChange={() => handleLevelChange(level)} checked={selectedLevels.includes(level)} />
                {level}
              </label>
            ))}
          </div>
        </div>
        <div className="button-container">
            <button className="submit-button" type="submit">Get Recipes</button>
            </div>
      </form>
    </div>
  );
}