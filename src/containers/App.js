import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  state = {
    persons :[
      {id:"1", name:"Harry", age:"25"},
      {id:"2", name:"Max", age:"29"},
      {id:"3", name:"Stephen", age:"22"}
    ],
    otherState: 'Some other value',
    showPersons:false
  }

  eventHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p=>{
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // const person = Object.assign({},this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons:persons});

    // this.setState({
    //   persons :[
    //     {name:"Harry", age:"25"},
    //     {name:event.target.value, age:"29"},
    //     {name:"Stephen", age:"22"}
    //   ]
    // })
  }

  deletePersonsHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;

    if(this.state.showPersons){
      persons = 
        < Persons 
        persons={this.state.persons}
        clicked={this.deletePersonsHandler}
        changed={this.eventHandler}/>;
    }

    return (
      <div className={classes.App}>
        < Cockpit 
        appTitle = {this.props.title}
        showPersons = {this.state.showPersons}
        persons = {this.state.persons}
        clicked = {this.togglePersonsHandler} />
        {persons}
      </div>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'))
  }
}

export default App;
