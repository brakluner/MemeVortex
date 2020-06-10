import React from "react";


function Milk(props) {
    
  return (<div>
                {props.url} {props.children}</div>);
}

export default Milk;