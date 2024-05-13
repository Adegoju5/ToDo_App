import React, { useState, useEffect } from 'react';


function DeletetaskComponent(props) {
  

  const handleYes = () => {
    
    
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Are you sure you want to delete Task?</h2>
       
        <button onClick={ () => props.handleYesDelete(props.id)  }>Yes</button>
      </div>
    </div>
  );
}

export default DeletetaskComponent;