import React, {Component} from 'react'
import {connect} from 'react-redux'
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

        console.log("selectedPost: " + JSON.stringify(selectedPost) + " edit: " + edit)
        let editable = (selectedPost && selectedPost.id && edit)

        switch (editable) {
            case true:
                return ( <PostDetailEditable history={this.props.history}/> )
            case false:
                return ( <PostDetailReadonly/> )
            default:
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


export default connect(mapStateToProps)(PostDetail);
