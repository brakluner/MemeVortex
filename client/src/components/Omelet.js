import React, { Component } from "react";
import Eggs from "./Eggs";
import Milk from "./Milk";
import API from "../utils/API";



class Omelet extends Component {
    state = {
        result: {},
        result1: {},
        search: ""
    };

    componentDidMount() {
        this.getMemeTable();
      }
    

    getMemeTable = memes => {
        API.getMemes(memes)
            .then(res => this.setState({ result: res.data.memes
                                        }))
            .catch(err => console.log(err));
    };

    render() {
        return (
                <Milk>
                    <div className="img">
                    <img src={this.state.result.url} alt=''></img>
                    </div>
                    <div className="meatTable">
                    <Eggs
                    name={this.state.result.name}
                    ></Eggs>
                    </div>
                </Milk>
            
        )
    }
}

export default Omelet;