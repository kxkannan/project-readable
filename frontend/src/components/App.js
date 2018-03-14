import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import * as CategoriesAPI from '../CategoriesAPI';
import CategoryMenu from './CategoryMenu';
import CategoryPost from './CategoryPost';
import { addPost, addCommentsToStore } from '../actions'
import PostDetail from './PostDetail'
import NewPost from './NewPost'
import NotFoundPage from './NotFoundPage'


class App extends Component {

    componentDidMount() {

        CategoriesAPI.all_posts().then((response) => {
            this.props.addAllPosts(response)
        })
    }

    render() {
        const { categories } = this.props

        return (
            <div className="App">

                <CategoryMenu/>

                <Switch>
                    {categories.map((category, idx) => {
                            return <Route exact={true} key={idx} path={'/' + category}
                                          render={() => <CategoryPost selectedCategory={category} />}/>
                        }
                    )
                    }
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
        categories: posts.categories,
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