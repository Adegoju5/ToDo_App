import React, { useState } from 'react';
import './right_box.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import EdittaskOverlay from './edittask_overlay';
import DeletetaskComponent from './delete_task';

export default function RightBox(props) {
  const colorMapper = { Upcoming: "red", Ongoing: "yellow", Done: "green" };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = props.tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div>
      <div className="search_container">
        <input type="text" onChange={handleSearch} placeholder="Search..." className="search_box" />
        <i className="fa fa-search search_icon"></i>
      </div>
      <div className="task_box">
        <i className="fas fa-calendar" style={{ marginTop: '10px' }}></i>
      </div>
      <div className="todaytask">
        <h2>Your Tasko Tasks</h2>
        <h5>Check your tasks and their details</h5>
        <h2>Current Tasks</h2>
      </div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div className="taskboxes" key={task.id} style={{ backgroundColor: colorMapper[task.status] }}>
            {props.editopened && task.id === props.id && (
              <EdittaskOverlay reveal={props.reveal} handleEditSubmit={props.handleEditSubmit} id={props.id} tasks={props.tasks}></EdittaskOverlay>
            )}
            {task.delete && <DeletetaskComponent id = {task.id} handleYesDelete = {props.handleYesDelete} />}
            {task.closed ? (
              <>
                <h3 className="taskstatus">{task.status}</h3>
                {task.showsb ? <h1 className="ellipsis" onClick={() => props.handleClose(task.id)}>...</h1> : null}
              </>
            ) : (
              <>
                <h3 className="taskstatus" onClick={() => props.handleEditClick(task.id)}>{props.reveal ? "edit" : null}</h3>
                <h3 className="taskstatus" onClick={() => props.handleDelete(task.id)}>{props.reveal ? "delete" : null}</h3>
                {task.showsb ? <FontAwesomeIcon icon={faTimes} className="icon" onClick={(e) => props.handleClose(task.id)} /> : null}
              </>
            )}

            <div className="inner-taxbox">
              <h2>{task.title}</h2>
              <h5 className='esh'>{task.description}</h5>
              <select className="dropdown" value={task.status} onChange={(e) => props.handleStatus(task.id, e.target.value)}>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <div className="taskboxes">
          <h3 className="taskstatus">Unknown</h3>
          <div className="inner-taxbox">
            <h2>No task to display</h2>
            <h5>No task to display</h5>
          </div>
        </div>
      )}
    </div>
  );
}
