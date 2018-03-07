import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
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
      this.props.addAllPosts(response)
    })
  }

  render() {
    console.log("app render - categories = " + JSON.stringify(this.state.categories))

    return (
      <div className="App">

        <CategoryMenu categories={this.state.categories} />

        {/*{this.state.categories.map( (category) => {*/}
              {/*return <Route key={category.path} path={'/' + category.path}  render={() => <CategoryPost category={category} />} /> }*/}
           {/*)*/}
        {/*}*/}

        <Route path="/react" render={() => <CategoryPost selectedCategory="react"/>} />

        <Route exact path="/" render={() => <CategoryPost selectedCategory="all"/> } />

      </div>
    );
  }
}

function mapStateToProps (posts) {
    return posts
}

function mapDispatchToProps (dispatch) {
    return {
        addAllPosts: (data) => dispatch(addPost(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)