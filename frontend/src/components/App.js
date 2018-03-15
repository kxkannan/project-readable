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
import NotFoundPage from './NotFoundPage'


class App extends Component {

    componentDidMount() {
        CategoriesAPI.all_posts().then((response) => {
            this.props.addAllPosts(response)
        })
    }

    addCategoryRoutes = (categories) => {
        console.log("addCategoryRoutes categories: " + JSON.stringify(categories))
        {categories.map((category, idx) =>
                <Route exact={true} key={idx} path={'/' + category}
                              render={() => <CategoryPost selectedCategory={category} />}/>
            )
        }
    }


    render() {
        const { posts } = this.props

        console.log("categories: " + JSON.stringify(posts))
        console.log("addCategoryRoutes: " + this.addCategoryRoutes(categories))

        return (
            <div className="App">

                <CategoryMenu/>

                <Switch>
                    {this.addCategoryRoutes(categories)}
                    <Route path="/new_post" exact component={NewPost}/>
                    <Route path="/:category/:postId" exact component={PostDetail}/>
                    <Route path="/" exact render={() => <CategoryPost selectedCategory="all"/> }/>
                    <Route component={NotFoundPage}/>
                </Switch>

            </div>
        );
    }
}

function mapStateToProps({posts }) {
    return {
        posts: posts.posts,
        selectedPostId: posts.selectedPostId,
        edit: posts.edit,
        categories: posts.posts.categories ? posts.posts.categories : [],
        comments: posts.comment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAllPosts: (data) => dispatch(addPost(data)),
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))