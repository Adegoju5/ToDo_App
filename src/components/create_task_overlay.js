import React from 'react';
import './create_task_overlay.css';

function CreatetaskOverlay(props) {
  return (
    <div>
        <div className="overlayed">
          <div className="overlayed-content">
            <h2>Enter Data</h2>
            <input
              type="text"
              placeholder="Title"
              value={props.Title}
              onChange={props.handleSettitle}
            />
            <input
              type="text"
              placeholder="Description"
              value={props.Description}
              onChange={props.handleSetdescription}
            />
            <button onClick={props.handleSubmit}>Submit</button>
          </div>
        </div>

    </div>
  )
}


export default CreatetaskOverlay;