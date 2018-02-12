import React, { Component } from 'react';
import './App.css';
import * as CategoriesAPI from './CategoriesAPI';
import CategoryMenu from './CategoryMenu';

class App extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    CategoriesAPI.categories().then((categories) => {
      console.log("categories: " + JSON.stringify(categories))
      this.setState({ categories })
    })
  }

  render() {
    console.log("app render - categories = " + JSON.stringify(this.state.categories))
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Readable</h1>
        </header>
 
        <CategoryMenu categories={this.state.categories} />

      </div>
    );
  }
}

export default App;
