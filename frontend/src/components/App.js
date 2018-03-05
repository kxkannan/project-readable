import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import * as CategoriesAPI from '../CategoriesAPI';
import CategoryMenu from './CategoryMenu';
import CategoryPost from './CategoryPost';
import { addPost } from '../actions'


class App extends Component {
  state = {
      categories: [],
      allPosts: []
  }


  componentDidMount() {

    CategoriesAPI.categories().then((categories) => {
      this.setState({categories})
    })

    CategoriesAPI.all_posts().then((response) => {
      //this.setState({allPosts: response})
      //store.dispatch()

    })
  }

  render() {
    console.log("app render - categories = " + JSON.stringify(this.state.categories))

    return (
      <div className="App">

        <CategoryMenu categories={this.state.categories} />

        <CategoryPost posts={this.state.allPosts} />

      </div>
    );
  }
}

function mapStateToProps ({ posts }) {

    return { }
}

function mapDispatchToProps (dispatch) {
    return {
        selectRecipe: (data) => dispatch(addPost(data)),
        //remove: (data) => dispatch(removeFromCalendar(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)