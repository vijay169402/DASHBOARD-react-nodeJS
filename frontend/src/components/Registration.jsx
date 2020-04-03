import React, { Component } from "react";
// import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import ButtonM from '@material-ui/core/Button'
//import { withStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import '../index.css'


const MyButton = styled(ButtonM)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'red',
  height: 48,
  padding: '0 30px',
});


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      //emailError:" "
      password: "",
      err_msg: false,
      err_msg2:false,
      err_msg3:false,    
    }
  }

  handleSubmit = event => {
     event.preventDefault(); 
    console.log(this.state.name,this.state.email,this.state.password)
    if (this.state.name!=="" && this.state.email!=="" && this.state.password!=="" ){
      const user = { name: this.state.name,email:this.state.email,password:this.state.password};
      axios.post(`http://localhost:8012/register`, user)
      .then(res => { 
        console.log("id ..",res)
  
        if(res.data.success){
          // this.props.history.push('/welcome')
          this.props.history.push('/dashboard/'+res.data.userid)
        }
        else{
          //alert(res.data.error_msg)
            
            if(res.data.status){
              //alert("invalid password")
              this.setState({
                err_msg:true
              })
            }
            else{
             if(res.data.fault){
                //alert("invalid email")
               this.setState({
                 err_msg2:true
                })
              }
              else{
                // alert("email already exist")
                this.setState({
                 err_msg3:true
                }
                )
              }
            }
            
        }
       })
       .catch(error => {
        console.log(error)
    });

    }
      
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });

  }

  render() {
    return (
      
      <div >
        
        <h2>REGISTRATION PAGE</h2>
        <TextField
          id="name"
          label="Name"
          required
         // className={styles.root}
          value={this.state.name}
          onChange={this.handleChange}
          autoComplete="current-password"
          margin="normal"
        /><br></br>
        <TextField
          id="email"
          label="email"
          required
          value={this.state.email}
          onChange={this.handleChange}
          //helperText={this.state.err_msg2 ? <span style={{color:"#f44336"}}>Invalid email</span> : ""}
          helperText={this.state.err_msg3 ? <span style={{color:"#f44336"}}>Email Already taken</span> : ""}
          type="email"
          autoComplete="current-password"
          margin="normal"
        /><br></br>
        
        <TextField
           id="password"
           label="Password"
           required
           helperText={this.state.err_msg ? <span style={{color:"#f44336"}}>Invalid Password</span> : ""}
           value={this.state.password}
           onChange={this.handleChange}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <div>
            <MyButton className="btnn"
              type="submit" onClick={this.handleSubmit}
            >
              SignUp
          </MyButton>
          <p>If you have an account <a href="/login">Login</a></p>
          </div>
      </div>
    )
  }
}
export default withRouter(Registration);