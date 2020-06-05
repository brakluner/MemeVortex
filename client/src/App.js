import React from "react";
import { BrowserRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Route from 'react-router-dom/Route';
import Omelet from './components/Omelet'


import "./App.css";

class App extends React.Component {
  state = {
    items: Array.from({ length: 20 })
  };

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };

  render() {
  return (
    <div>
      <BrowserRouter>
      <div>
        <h2>Fast Meme Meme Stash</h2>
        <Route path="/" exact render={
          () => {
            return ( <div>
<InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.items.map((i, index) => (
            <Omelet key={index}>
              {index}
            </Omelet>
          ))}
        </InfiniteScroll>                      </div>);
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
}

export default App;