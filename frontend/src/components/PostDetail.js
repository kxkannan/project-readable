import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updatePost } from "../actions";
import { Route } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import PostDetailReadonly from './PostDetailReadonly'
import PostDetailEditable from './PostDetailEditable'


class PostDetail extends Component {

    render() {
        const { posts, selectedPostId, edit } = this.props

        let selectedPost = {}
        if (posts && selectedPostId && posts.byId[selectedPostId] && !posts.byId[selectedPostId].deleted ) {
            selectedPost = posts.byId[selectedPostId]
        }

        if (selectedPost && selectedPost.id && !edit) {
            return ( <PostDetailReadonly/> )
        }
        else if (selectedPost && selectedPost.id && edit) {
            return ( <PostDetailEditable history={this.props.history}/> )
        }
        else {
            return <Route component={NotFoundPage}/>
        }
    }
}

function mapStateToProps( state ) {
    return {
        posts: state.posts.posts,
        selectedPostId: state.posts.selectedPostId,
        edit: state.posts.edit,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
