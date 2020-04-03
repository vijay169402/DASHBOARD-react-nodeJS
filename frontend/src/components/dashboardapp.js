import React from 'react';
//import './App.css';
//import AppDragDropDemo from './AppDragDropDemo';
//import Container from 'react-module-container'
import styled from 'styled-components'
// import Dragable from './Dragable/Dragable'
// import Dropable from './Dropable/Dropable'
import DndTest from './DndTest'
//import DndTest2 from './DndTest2'

//import Login2 from './Login2' 
const AppWrapper = styled.div `
       display: flex,
       justify-content: center;
        margin-top: 1px;;
`;
const Container = styled.div ``;
export default class  Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      checked: false,
      user_id:this.props.match.params.id
    }
  }
  render(){
    console.log("this",this.props)
    return (
      <div className="App">
        {/* Dashboard */}
        <AppWrapper />
        <Container />
        {/* <Dragable /> */}
        {/* <Dropable /> */}
        <DndTest user_id={this.state.user_id}/>
        {/* <button onClick={}>Save</button> */}
      </div>
    )
  }
 ;
}

//export default App;
