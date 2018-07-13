import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Block from "./components/Block";
import "./App.css";

class App extends Component {
  // GAME VARIABLES
  //  COLORS: list of all colors that can be used
  COLORS = ["yellow","green","red","blue"];
  //  COLORSUSED: number of colors from COLORS list that want to be used for game
  COLORSUSED = this.COLORS.length;
  //  COLORSPERBLOC: number of colors that will fit in a block
  COLORSPERBLOCK = 2;
  //  NUMBLOCKS: number of blocks that will be displayed on screen
  //    , plan to increase as game continues to increase difficulty
  NUMBLOCKS = 4;
  //  colorId: each block is given and index as an id, then each node
  //    in choices Tree will be given a key, (for react to use)
  colorId = this.NUMBLOCKS + 1;

  //  playerLost: bool to determine if player has lost game, and theirfore
  //    should not let player select blocks (refresh button does not work)
  playerLost = false;

  // choicesTree: recursively generate tree where each node is a color,
  //    each branch path represents an block color order
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

  //  choicesLeft: number of unique arrangements of colors within a block
  choicesLeft = Math.pow(this.COLORSUSED,this.COLORSPERBLOCK);
  // choices: tree where colors are nodes and each branch is a unique color order
  choices = this.choicesTree({},this.COLORSPERBLOCK)
  // state: intend to use to refresh the page
  state = {
    blocks:[]
  };

  // randomIndex: select a random index from the array (returns an int)
  randomIndex = (arr)=>{
    return Math.floor(Math.random() * arr.length);
  };

  // randomColorArr: recursively generate random array of colors to display within a block
  //  using the choices Tree as reference for keys
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

  //  newBlock(NOT FINISHED): generate a block that has not been selected yet 
  newBlock = ()=>{
    const block = 
      <Block 
        colorArr={this.randomColorArray([],this.selected)}
      />
    return block;
  };

  // selectBlock(NOT FINISHED): when a block is clicked, determine if it has already been selected
  //   if clicked unselected block then continue game, else stop
  selectBlock = (colorArr)=>{
    let current = this.choices;
    for (let i=0; i<colorArr.length; i++){
      const colorObj = colorArr[i];
      current = current.children[colorObj.color];
    }
    if (!current.isSelcted){
      current.isSelcted = true;
      this.choicesLeft--;
      this.generateBlocks();
    }else{
      const blocks = <h3>SORRY YOU LOST, REFRESH PAGE TO TRY AGAIN</h3>;
      this.setState({blocks});
      this.playerLost = true;
    }
  };

  //  generateBlocks(NOT FINISHED): if player has not lost, create 1 unselected block (if possible, if not possible then player has won game)
  //    and the rest of the block are random (can contain unselected blocks and duplicates (future fix))
  generateBlocks = ()=>{
    if(!this.playerLost){
      let blocks = [];
      const uniqueBlockIndex = null;//Math.floor(Math.random() *this.NUMBLOCKS);
      // console.log(uniqueBlockIndex);
      for (let i=0; i<this.NUMBLOCKS; i++){
        let colorDataObj = null;
        if (i === uniqueBlockIndex){
          // colorDataObj = this.newColorArray();
        }else{
          colorDataObj = this.randomColorArr([],this.choices,this.COLORSPERBLOCK);
        }
        blocks.push(<Block
            colorArr={colorDataObj}
            key={i}
            selectBlock={this.selectBlock}
          />);
      }
      this.setState({blocks});
    }
  };

  render() {
    return (
      <Wrapper>
        <button onClick={()=>{this.generateBlocks()}}>REFRESH</button>
        <Title>Click Game</Title>
        {this.state.blocks}
      </Wrapper>
    );
  }
}

export default App;
