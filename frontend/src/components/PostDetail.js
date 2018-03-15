import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import PostDetailReadonly from './PostDetailReadonly'
import PostDetailEditable from './PostDetailEditable'
import * as CategoriesAPI from "../CategoriesAPI";
import {addCommentsToStore} from "../actions/comment_action_creators";


class PostDetail extends Component {

    componentDidMount() {
        CategoriesAPI.comments(this.props.selectedPostId).then((response) => {
            this.props.addCommentsToStore(response)
        })
    }

    render() {
        const { posts, selectedPostId, edit } = this.props

        let selectedPost = {}
        if (posts && selectedPostId && posts.byId[selectedPostId] && !posts.byId[selectedPostId].deleted ) {
            selectedPost = posts.byId[selectedPostId]
        }

        let editable = (selectedPost && selectedPost.id && edit)

        switch (editable) {
            case true:
                return ( <PostDetailEditable history={this.props.history}/> )
            case false:
                return ( <PostDetailReadonly history={this.props.history}/> )
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


function mapDispatchToProps(dispatch) {
    return {
        addCommentsToStore: (data) => dispatch(addCommentsToStore(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

