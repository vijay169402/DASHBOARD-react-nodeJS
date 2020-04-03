import React from 'react';
import styled from 'styled-components';


import { ReactSortable } from "react-sortablejs";
import axios from 'axios';


const Wrapper = styled.div `
        width:100%;
        padding: 100 px;
         position: center;
        display: flex;
        justify-content: left;
`;

const Item= styled.div `
        padding: 28px;
        display: inline-block;
        color: #555;
        position: left;
        background-color: green;       

`;

export default class DndTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {id: 1, name: "Box 1"},
                {id: 2, name: "Box 2"},
                {id: 3, name: "Box 3"}
            ],
            user_id:{userid:this.props.user_id},
        }
    }

    componentWillMount(){
        this.fetchBoxDetail()
    }

    handlebutton = () => {
       // console.log(this.state.list)
        let data = {...this.state.list,...this.state.user_id}
        console.log('dataaa',this.state.list)
        axios.post(`http://localhost:8012/boxdatabase`, data)
        .then(res => {
            console.log(res,"bjhbjh") 
            if(res.data.success === 1){
                alert(res.data.message)
            }
           })
           .catch(error => {
            console.log(error)
        });
    }

    fetchBoxDetail = () => {
        let userid = this.state.user_id
        console.log("bjhbjhhygyhfhg",userid)
        axios.post(`http://localhost:8012/boxdetail`, userid)
        .then(res => {
            console.log(res.data.data[0],"bjhbjh")
            //let name1 =  
            var resp = [
                            {id:res.data.data[0].box1posid, name:res.data.data[0].box1posid===1? "Box1" :(res.data.data[0].box1posid ===2 ? "Box2" : "Box3")},
                            {id:res.data.data[0].box2posid, name:res.data.data[0].box2posid===2? "Box2" :(res.data.data[0].box2posid ===3 ? "Box3" : "Box1")},
                            {id:res.data.data[0].box3posid, name:res.data.data[0].box3posid===3? "Box3" :(res.data.data[0].box3posid ===1 ? "Box1" : "Box2")}               
                       ]
            if(res.data.success === 1){
                this.setState({
                   list:resp
                })
                
            }
           })
           .catch(error => {
            //console.log(error)
        });
    }
    render() {
        console.log("this.props",this.state.list)
        return (
            <Wrapper>             
                <ReactSortable list={this.state.list} setList={newState => this.setState({ list: newState })}>
                    {this.state.list.map(item => (
                        <Item key={item.id}>{item.name}</Item>
                    ))}
                </ReactSortable>
                
                                
            <button type="submit" onClick={this.handlebutton} >save</button>
                 <button type="submit" onClick={this.handlelogout} >logout</button>
             </Wrapper>
              
        )//

    }

}