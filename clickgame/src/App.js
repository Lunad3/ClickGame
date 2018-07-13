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
  colorId = this.NUMBLOCKS + 1;

  choicesTree = (node,counter)=>{
    node.children = {};
    node.allChildrenSelected = false;
    node.isSelcted = false;
    node.key = this.colorId++;
    if (counter>0){
      counter--;
      node.isLeaf = false;
      for (let i=0; i<this.COLORSUSED; i++){
        node.children[this.COLORS[i]] = this.choicesTree({},counter);
      };
    }else if (counter <= 0){
      node.isLeaf = true;
    }
    return node;
  };

  optionsLeft = (colorsSelected)=>{
    return Math.pow(this.COLORSUSED,(this.COLORSPERBLOCK - colorsSelected));
  };

  state = {
    choices: this.choicesTree({},this.COLORSPERBLOCK),
    choicesLeft: this.optionsLeft(0)
  };

  //---------------------------------------------------------------------------------

  // returns 0 if all children have been selected, else a child is not selected
  updateChildren = (node)=>{
    if(node.isLeaf || node.allChildrenSelected){
      return 0;
    }else if(node.selected){
      let result = 0;
      for(let child in node.children){
        result += this.updateChildren(child);
      }
      return result;
    }
    return 1;
  };

  selectNode = (node)=>{
    node.selected = true;
    if (this.updateChildren(node) === 0){
      node.allChildrenSelected = true;
    }
  };

  removeColors = (colorArr)=>{
    let choices = this.COLORS;
    for(let i=0; i<colorArr.length; i++){
      choices.splice(colorArr.indexOf(colorArr[i]),1);
    }
    return choices;
  };

  randomIndex = (arr)=>{
    return Math.floor(Math.random() * arr.length);
  };

  randomColorArr = (result,node,count)=>{
    if(count > 0){
      count--;
      const selectedColor = this.COLORS[this.randomIndex(this.COLORS)];
      const colorObj ={
        color:selectedColor,
        key:node.children[selectedColor].key
      }
      result.push(colorObj);
      return this.randomColorArr(result,node.children[selectedColor],count);
    }else{
      return result;
    }
  };

  newBlock = ()=>{
    const block = <Block colorArr={this.randomColorArray([],this.state.selected)}/>
    return block;
  };

  generateBlocks = ()=>{
    let blocks = [];
    const uniqueBlockIndex = null;//Math.floor(Math.random() *this.NUMBLOCKS);
    console.log(uniqueBlockIndex);
    for (let i=0; i<this.NUMBLOCKS; i++){
      console.log("B: "+(i+1) + "/"+this.NUMBLOCKS);
      let colorDataObj = null;
      if (i === uniqueBlockIndex){
        // colorDataObj = this.newColorArray();
      }else{
        colorDataObj = this.randomColorArr([],this.state.choices,this.COLORSPERBLOCK);
      }
      console.log(colorDataObj);
      blocks.push(<Block colorArr={colorDataObj} key={i}/>);
    }
    return blocks;
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
