import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updatePost } from "../actions";
import Comment from './Comment'
import CommentList from './CommentList'
import LineSeparator from "./LineSeparator";

class PostDetailReadonly extends Component {


    render() {
        const { posts, selectedPostId } = this.props

        let selectedPost = {}
        if (posts && selectedPostId && posts.byId[selectedPostId] && !posts.byId[selectedPostId].deleted ) {
            selectedPost = posts.byId[selectedPostId]
        }

        return (
        <table>
            <tbody>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr className="showPostTitle">
                <td>
                    <span className="showPostTitle">{selectedPost.title}</span>
                    <span className="showAuthor">({selectedPost.author})</span>
                </td>
                <td></td>
            </tr>
            <tr className="showSubtext">
                <td className="showSubtext">
                    <span>{selectedPost.voteScore} votes | </span>
                    <span>{new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()} |</span>
                    <span>{selectedPost.commentCount} comments |</span>
                </td>
            </tr>
            <tr className="bodyContainer">
                <td>
                    <p className="showPostBody">{selectedPost.body}</p>
                </td>
            </tr>
            </tbody>
            <Comment/>
            <LineSeparator/>
            <CommentList/>
        </table>
       )
    }

}

function mapStateToProps( state ) {
    return {
        posts: state.posts.posts,
        selectedPostId: state.posts.selectedPostId,
        comments: state.posts.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data)),
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(PostDetailReadonly)