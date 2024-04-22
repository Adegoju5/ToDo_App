import './App.css';

function App() {
  return (
    <div className="App">
     <div className="left_box">

     </div>

     <div className="right_box">
       <div className="search_container">
         <input type="text" placeholder="Search..." className="search_box"/>
         <i className="fa fa-search search_icon"></i>
       </div>
       <div className="task_box">
          <i class="fas fa-calendar" style={{marginTop: '10px'}}></i>


       </div>
    </div>
   </div>
  );
}

export default App;
