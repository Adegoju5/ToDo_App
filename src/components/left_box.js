import React from 'react';
import './left_box.css';


function LeftBox(props) {
  return (

    <div>
          <h2 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Tasko</h2>
          <button className="create_task_button" onClick={props.createTask}>Create Task</button>
          <button className="delete_task_button" onClick={props.handleClearStorage}>Delete All Task</button>
    </div>
  )
}

export default LeftBox;