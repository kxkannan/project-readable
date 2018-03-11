import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import * as CategoriesAPI from '../CategoriesAPI';
import CategoryMenu from './CategoryMenu';
import CategoryPost from './CategoryPost';
import { addPost } from '../actions'
import PostDetail from './PostDetail'
import NewPost from './NewPost'


class App extends Component {

  componentDidMount() {

    CategoriesAPI.all_posts().then((response) => {
      this.props.addAllPosts(response)
    })
  }

  render() {
    const { posts, categories } = this.props

    return (
      <div className="App">

        <CategoryMenu/>

        {categories.map( (category, idx) => {
                return <Route exact={true} key={idx} path={'/' + category}  render={() => <CategoryPost selectedCategory={category} />} /> }
             )
        }
        <Route path="/new_post" component={NewPost}/>
        <Route exact={true} path="/:category/:postId" component={PostDetail} />
        <Route exact={true} path="/" render={() => <CategoryPost selectedCategory="all"/> } />

      </div>
    );
  }
}

function mapStateToProps ({posts } ) {
    console.log("App mapStateToProps posts: " + JSON.stringify(posts))
    console.log("App selectedPostId: " + posts.selectedPostId + " edit: " + posts.edit + " categories: " + JSON.stringify(posts.categories))
    return {
        posts: posts.posts,
        selectedPostId: posts.selectedPostId,
        edit: posts.edit,
        categories: posts.categories,
        comments: posts.comment
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addAllPosts: (data) => dispatch(addPost(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))