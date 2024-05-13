import React, { useEffect, useState } from 'react';
import './App.css';
import LeftBox from './components/left_box';
import RightBox from './components/right_box';
import CreatetaskOverlay from './components/create_task_overlay';

export function App() {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [tasksobj, setTasksobj] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);
  const [editopened, seteditOpened] = useState(false);
  const [id, setId] = useState('');
  const [reveal, setReveal] = useState(true);
  

  const handleSubmit = () => {
    if (Title !== '' && Description !== '') {
      const currentTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
        title: Title,
        description: Description,
        status: 'Upcoming',
        closed: true,
        delete: false,
        showsb: true
      };
      const newTasks = [...tasks, currentTask];
      const newTask = { ...tasksobj, [currentTask.id]: currentTask };
      setTasks(newTasks);
      setTitle('');
      setDescription('');
      setShowOverlay(false);
      localStorage.setItem('tasks', JSON.stringify(newTask));
    } else {
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('tasks'));
    if (storedItems) {
      setTasksobj(storedItems);
      setTasks(Object.values(storedItems));
    }
  }, []);

  const handleEditClick = (id) => {
    setId(id);
    seteditOpened((editopened) => !editopened);
    setReveal((reveal) => !reveal);
    const taskIndex = tasks.findIndex((item) => item.id === id);
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].showsb = false;
        setTasks(updatedTasks);
      }
    } 

  const createTask = () => {
    setShowOverlay(true);
  };

  const handleClearStorage = () => {
    localStorage.clear();
    setTasksobj({});
    setTasks([]);
  };

  const handleStatus = (id, status) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].status = status;
      setTasks(updatedTasks);
      const updatedTask = updatedTasks[taskIndex] ;
      const updatedTasksObj = { ...tasksobj, [id]: updatedTask };
      localStorage.setItem('tasks', JSON.stringify(updatedTasksObj));
    }
  };

  const handleClose = (id) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].closed = !updatedTasks[taskIndex].closed;
      setTasks(updatedTasks);
    }
  };

  const handleDelete = (id) => {
    const taskIndex = tasks.findIndex((item) => item.id === id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].delete = !updatedTasks[taskIndex].delete;
      updatedTasks[taskIndex].showsb = false;
      setTasks(updatedTasks);
      setReveal(false) ;
    }
  };
  const handleSettitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetdescription = (e) => {
    setDescription(e.target.value);
  };

  const handleEditSubmit = (updatedTitle, updatedDescription) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        title: updatedTitle,
        description: updatedDescription,
        showsb: true,
        closed: true
      };

      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return updatedTask;
        }
        return task;
      });

      setTasks(updatedTasks);

      const updatedTasksObj = { ...tasksobj, [id]: updatedTask };

      localStorage.setItem('tasks', JSON.stringify(updatedTasksObj));

      seteditOpened(false);
      setReveal(true);
    }
  };

  const handleYesDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
  
    setTasks(updatedTasks);
  
    const updatedTasksObj = { ...tasksobj };
    delete updatedTasksObj[id];
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasksObj));
  
    seteditOpened(false);
    setReveal(true);
  };
  

  return (
    <div className="App">
      <div className="left_box">
        <LeftBox createTask={createTask} handleClearStorage={handleClearStorage} />
      </div>

      <div className="right_box">
        <RightBox
          handleClose={handleClose}
          handleEditSubmit={handleEditSubmit}
          id={id}
          handleYesDelete = {handleYesDelete}
          reveal={reveal}
          handleDelete = {handleDelete}
          editopened={editopened}
          handleEditClick={handleEditClick}
          tasks={tasks}
          handleStatus={handleStatus}
        />
      </div>
      {showOverlay && (
        <CreatetaskOverlay
          handleSettitle={handleSettitle}
          handleSetdescription={handleSetdescription}
          Title={Title}
          Description={Description}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
