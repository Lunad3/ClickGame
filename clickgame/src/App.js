import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Block from "./components/Block";
import "./App.css";



class App extends Component {

  COLORS = ["yellow","green","red","blue"];
  COLORSUSED = 0||this.COLORS.length;
  COLORSPERBLOCK = 2;
  NUMBLOCKS = 4;

  choicesTree = (node,counter)=>{
    if (counter>0){
      counter--;
      for (let i=0; i<this.COLORSUSED; i++){
        const child = {
          children:{},
          isSelcted:false,
          allChildrenSelected:true,
          isLeaf:true
        };  
        node.children[this.COLORS[i]] = this.choicesTree(child,counter);
      }
      node.isLeaf = false;
      node.allChildrenSelected = false;
    }
    return node;
  };

  //returns 0 if all children have been selected, else a child is not selected
  updateChildren = (children)=>{
    for(let child in children){
      if (children[child])
    }
  };

  selectNode = (node)=>{
    node.selected = true;
    if (!this.updateChildren(node)){
      node.allChildrenSelected = true;
    }
  };


  optionsLeft = (colorsSelected)=>{
    return Math.pow(this.COLORSUSED,(this.COLORSPERBLOCK - colorsSelected));
  };

  removeColors = (colorArr)=>{
    let choices = COLORS;
    for(let i=0; i<colorArr.length; i++){
      choices.splice(colorArr.indexOf(colorArr[i]),1);
    }
    return choices;
  };

  refineChoices = (colorArr,blocksArr)=>{
    let choices = this.COLORS;
    const colorIndex = colorArr.length-1;
    if(colorIndex == -1){
      return choices;
    }
    const color = colorArr[colorIndex];
    let newBlocksArr = [];
    for(let blockIndex=0; blockIndex<blocksArr.length; blockIndex++){
      if(blocksArr[blockIndex][colorIndex] == color){
        newBlocksArr.push(blocksArr[blockIndex]);
      }
    }

    return choices;
  };

  randomIndex = (arr)=>{
    const index = arr[Math.floor(Math.random() * arr.length)];
    return index;
  };

  newColorArray = (colorArr,blocksArr)=>{
    if(colorArr.length < this.COLORSPERBLOCK){
      const choices = this.refineChoices(colorArr,blocksArr);
      colorArr.push(choices[this.randomIndex(choices)])
      return this.newColorArray(colorArr);
    }else if(colorArr.length >= this.COLORSPERBLOCK){
      return colorArr;
    }
    return 1;
  };

  newBlock = ()=>{
    const newBlock = <Block colorArr={this.newColorArray([],this.state.selected)}/>
    blocksArr.push(newBlock);
    return newBlock;
  };

  // Setting this.state.friends to the friends json array
  state = {
    choices: this.choicesTree({},this.COLORSPERBLOCK),
    choicesLeft: this.optionsLeft(0)
  };

  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

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
