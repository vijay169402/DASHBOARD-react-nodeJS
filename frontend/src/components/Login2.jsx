import React, { Component } from "react";
//import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import ButtonM from '@material-ui/core/Button'
import {styled} from '@material-ui/core/styles';
// import Styled from 'styled-components';
import '../index.css'
//import {Container, Row, Col} from 'react-bootstrap';
const MyButton = styled(ButtonM)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'red',
  height: 48,
  padding: '0 30px',
});


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errmsg: false
    }
  }
  

  handleSubmit = event => {
     event.preventDefault(); 
    const user = {email:this.state.email,password:this.state.password};
      axios.post(`http://localhost:8012/login`, user)
      .then(res => { 
        // var m=res.data.userid
        // console.log(m)
        if(res.data.success){
          // axios.post(`http://localhost:8012/boxdatabase`,m)
            this.props.history.push('/dashboard/'+res.data.userid)
          }
        else{
          //alert("incorrect password")
          this.setState({
            errmsg:true
          })

        }
       })
       .catch(error => {
        console.log(error)
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });

  }
  

  render() {
    return (
      <div className="Login">
        <h2>LOGIN PAGE</h2>
        <TextField
          id="email"
          label="email"
          value={this.state.email}
          onChange={this.handleChange}
          type="email"
          autoComplete="current-password"
          margin="normal"
        /><br></br>
        <TextField
           id="password"
           label="Password"
           value={this.state.password}
           onChange={this.handleChange}
           helperText={this.state.errmsg ? <span style={{color:"#f44336"}}>Incorrect Password</span> : ""}
          type="password"
          autoComplete="current-password"
          margin="normal"
        /><br></br>
        <div>
            <MyButton className="btnn"
              type="submit" onClick={this.handleSubmit}
            >
              Login
          </MyButton>
          
          </div>
    </div>
    )
  }
}

export default withRouter(Login);