import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Block from "./components/Block";
import "./App.css";



class App extends Component {

  MAXCOLORS = 1;
  NUMBLOCS = 4;
  COLORS = ["yellow","green","red","blue"];

  randomColor = ()=>{
    const color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
    // console.log(color);
    return color;
  };

  randomColorArray = ()=>{
    let colorArr = [];
    for(let i=0; i<this.MAXCOLORS; i++){
      colorArr.push(this.randomColor());
    }
    return colorArr;
  };

  generateBlocks = ()=>{
    let blocks = [];
    for (let i=0; i<this.NUMBLOCS;i++){
      blocks.push(<Block colorArr={this.randomColorArray()} key={i}/>);
    }
    return blocks;
  }

  // Setting this.state.friends to the friends json array
  state = {
    selected:[]
  };

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };


  // Map over this.state.friends and render a FriendCard component for each friend object


  render() {
    return (
      <Wrapper>
        <Title>Click Game</Title>
        {this.generateBlocks()}
        </Wrapper>
    );
  }
}

export default App;
