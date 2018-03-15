import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

    render() {
        return (
            <div className="App">

                <CategoryMenu/>

                <Link to={this.props.location.pathname} />

                <Switch>
                    <Route exact={true} path="/:category/:postId" component={PostDetail}/>
                    <Route exact={true} path='/react' render={() => <CategoryPost selectedCategory="react" />} />
                    <Route exact={true} path='/redux' render={() => <CategoryPost selectedCategory="redux" />} />
                    <Route exact={true} path='/udacity' render={() => <CategoryPost selectedCategory="udacity" />} />
                    <Route exact={true} path="/new_post" component={NewPost}/>
                    <Route exact={true} path="/" render={() => <CategoryPost selectedCategory="all"/> }/>
                    <Route component={NotFoundPage} history={this.props.history}/>
                </Switch>

            </div>
        );
    }
}

function mapStateToProps({posts }) {
    return { posts }
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