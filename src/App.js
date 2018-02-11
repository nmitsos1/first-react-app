import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: []
    }
  }
  handleClick() {
    alert('Hello I am clicked!');
  }

  componentDidMount() {
    this.setState({
      randomQuote: "Loading a great quote..."
    })
    request.get('https://talaikis.com/api/quotes/random/')
      .end((error,result) => {
        this.setState({
            randomQuote: result.body.quote + " - " + result.body.author
          })
      });
  }

  refreshQuote() {
    request.get('https://talaikis.com/api/quotes/random/')
    .end((error,result) => {
      this.setState({
          randomQuote: result.body.quote + " - " + result.body.author
        })
    });
    this.setState(this.state);
  }
  render() {
    return (
      <div className="App">
        <Biography/>
        <GroceryList/>
        <ToDoList/>
        <button onClick={this.handleClick.bind(this)}>Click Me!</button>
        <p>REACT TEST</p>
        <p>React Training Day 1</p>
        <p onClick={this.refreshQuote.bind(this)}>{this.state.randomQuote}</p>
      </div>
    );
  }
}

class Biography extends Component {
  render() {
    return (
        <div id="biography">
          <h1>Biography</h1>
          <div id="bio-row" style={{textAlign: 'left'}}>
            <img src={logo} className="App-logo" alt="logo" />
            <h3>Name: Nick Mitsos</h3>
            <h3>Skill: Automation Testing</h3>
            <p>The date is </p>
          </div>
        </div>
    );
  }
}

class GroceryList extends Component {
  render() {
    const products = ['Bananas', 'Cookies', 'Ice Cream']
    return (
<div style={{borderStyle: 'solid'}}>
  <h1>Grocery List</h1>
  <ul style={{listStyle: 'none'}}>
    {products.map(product => <li>{product}</li>)}
  </ul>
  <br></br>
</div>
    );
  }
}

class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: []
    }
    var selected;
  }

  addItem() {
    this.state.todoItems.push(document.getElementById("newItem").value);
    document.getElementById("newItem").value="";
    this.setState(this.state);
  }

  selectItem(item) {
    alert("I've been clicked " + item);
    this.state.todoItems.splice(this.state.todoItems.indexOf(item), 1);
    this.setState(this.state);
  }

  render() {
    return (
      <div id="to-do-list" style={{borderStyle: 'solid'}}>
        <br></br>
        <label>Enter new item</label>
        <input type="text" id="newItem"></input>
        <button onClick={this.addItem.bind(this)}>Add Item</button>
        <br></br>
        <br></br>
        <h3 style={{textAlign: 'left'}}>To Do Items</h3>
        <div id="list" style={{textAlign: 'left'}}>
          <ul>
            {this.state.todoItems.map(item => <li onClick={this.selectItem.bind(this, item)}>{item}</li>)}
          </ul>
        </div>
        <br></br>
      </div>
    );
  }
}

export default App;
