import React, { useState, useEffect } from 'react';


function EdittaskOverlay(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Initialize title and description with the values of the task being edited
    const task = props.tasks.find(item => item.id === props.id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [props.id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    // Call onSubmit function passed from parent component to save changes
    props.handleEditSubmit(title, description);
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Edit Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          style={{ marginBottom: '10px', width: '80%' }}
       />
       <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          style={{ marginBottom: '10px', width: '80%', display: 'block' }}
       />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default EdittaskOverlay;
