import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';


import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
      <div>
        <h2>Fast Meme Meme Stash</h2>
        <Route path="/" exact render={
          () => {
            return ( <div>
           
            
                      </div>);
          }
        } />
        <Route path="/yourmemes" exact render={
          () => {
            return ( <div>
           
            </div>);
          }
        } />
        <Route path="/ourmemes" exact render={
          () => {
            return ( <div>
             
            </div>);
          }
        } />
      </div>
      </BrowserRouter>
     
    </div>
  );
}


export default App;