import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
// import Route from 'react-router-dom/Route';
import Omelet from './components/Omelet';
import { getFromStorage, setInStorage } from '../src/utils/storage';



import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props)
  this.state = {
    items: Array.from({ length: 20 }),
    isLoading: true,
    token: '',
    signUpError: '',
    signInError: '',
    signInEmail: '',
    signInPassword: '',
    signUpFirstName: '',
    signUpLastName: '',
    signUpEmail: '',
    signUpPassword: '',
  };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);

  }
  componentDidMount() {
    const obj = getFromStorage('the_main_app');
   
    if (obj && obj.token) {
      const { token } = obj;
      // Verify Token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            })
          } else {
            this.setState({
              isLoading: false
            })
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
    })
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        this.setState({
          signUpError: json.message,
          isLoading: false,
          signUpEmail: '',
          signUpPassword: '',
          signUpFirstName: '',
          signUpLastName: '',
        });
      } else {
        this.setState({
          signUpError: json.message,
          isLoading: false,
        });
      }
    });
  }
onSignIn() {
// Grab state
const {
  signInEmail,
  signInPassword,
} = this.state;

this.setState({
  isLoading: true,
});

// Post request to backend
fetch('/api/account/signin', { 
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: signInEmail,
    password: signInPassword
  }),
})
.then(res => res.json())
.then(json => {
  if (json.success) {
    setInStorage('the_main_app', { token: json.token })
    this.setState({
      signUpError: json.message,
      isLoading: false,
      signInEmail: '',
      signInPassword: '',
      token: json.token
    });
  } else {
    this.setState({
      signInError: json.message,
      isLoading: false,
    });
  }
});
}

logout() {
  this.setState({
    isLoading: true,
  });
  const obj = getFromStorage('the_main_app');
   
  if (obj && obj.token) {
    const { token } = obj;
    // Verify Token
    fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token: '',
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
      });
  } else {
    this.setState({
      isLoading: false,
    });
  }


}

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
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword, 
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;
if (isLoading) {
  return (<div><p>Loading...</p></div>);
}

if (!token) {
  return (
    <div className="row">
      <div className="col-4">
          {
            (signInError) ? (
              <p>{signInError}</p>
            ) : (null)
          }
          <form className="form-signin">
          <p>Sign In</p>
          <label for="inputEmail" className="sr-only">Email Address</label>
          <input 
          id='inputEmail'
          className="form-control"
          type="email" 
          placeholder="Email" 
          value={signInEmail}
          onChange={this.onTextboxChangeSignInEmail}
          />
          <br />
          <label for="inputPassword" className="sr-only">Password</label>
          <input 
          id="inputPassword"
          className="form-control"
          type="password" 
          placeholder="Password" 
          value={signInPassword} 
          onChange={this.onTextboxChangeSignInPassword}
          />
          <br />
          <button onClick={this.onSignIn}>Sign In</button>
          </form>
      </div>
      <div className='col-4'>
        <h1>MEME VORTEX</h1>
      </div>
      <div className='col-4'>
      {
            (signUpError) ? (
              <p>{signUpError}</p>
            ) : (null)
          }
        <form className="form-signin">
        <p>Sign Up</p>
        <label for="inputFirstName" className="sr-only">First Name</label>
        <input 
        className="form-control"
        id="inputFirstName"
        type="text" 
        placeholder="First Name" 
        value={signUpFirstName}
        onChange={this.onTextboxChangeSignUpFirstName}
        /><br />
        <label for="inputLastName" className="sr-only">Last Name</label>
        <input 
        className="form-control"
        id="inputLastName"
        type="text" 
        placeholder="Last Name"
        value={signUpLastName}
        onChange={this.onTextboxChangeSignUpLastName} 
        /><br />
        <label for="inputEmail" className="sr-only">Email Address</label>
        <input 
        className="form-control"
        id="inputEmail"
        type="email" 
        placeholder="Email" 
        value={signUpEmail}
        onChange={this.onTextboxChangeSignUpEmail}
        /><br />
        <label for="inputPassword" className="sr-only">Password</label>
        <input
        className="form-control"
        id="inputPassword"
        type="password" 
        placeholder="Password"
        value={signUpPassword}
        onChange={this.onTextboxChangeSignUpPassword} 
        /><br />
        <button onClick={this.onSignUp}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

  return (
    <div>
      <button onClick={this.logout}>Log Out</button>
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
        }
         />
        }
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
