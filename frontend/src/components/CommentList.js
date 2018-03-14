import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import { updateComment, deleteComment, upVoteComment, downVoteComment } from "../actions";
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import * as CategoriesAPI from "../CategoriesAPI";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-25%',
        transform             : 'translate(-70%, -70%)'
    }
};


class CommentList extends Component {

    constructor(props) {
        super(props)
        this.state = {
           showModal: false,
           commentId: null,
           selectedComment: {},
           updatedComment: ""

        }

    }

    deleteComment = (postId, commentId, event) => {
        this.props.deleteComment( {postId, commentId })
    }

    handleOpenModal = (commentId, event) => {
        this.setState({showModal: true,
                       commentId: commentId,
                       selectedComment: this.props.comments.byId[commentId]
                      })
    }

    handleCloseModal = (event) => {
        event.preventDefault();
        if (this.state.updatedComment.length > 0) {
            this.props.updateComment({
                commentId: this.state.commentId,
                updatedComment: this.state.updatedComment
            })
        }
        this.setState({showModal: false, comment_id: null, updatedComment: ""})
    }

    handleCommentChange = (event) => {
       this.setState({updatedComment: event.target.value })
        if (this.state.updatedComment) {
            this.props.updateComment({
                commentId: this.state.commentId,
                updatedComment: this.state.updatedComment
            })
        }
    }

    upVoteComment = (commentId, event) => {
        this.props.upVoteComment(commentId)
        CategoriesAPI.commentVote(commentId, {option: "upVote"}).then((response) => {
            console.log("Called server for upVote comment for " + commentId)
        })


    }

    downVoteComment = (commentId, event) => {
        this.props.downVoteComment(commentId)
        CategoriesAPI.commentVote(commentId, {option: "downVote"}).then((response) => {
            console.log("Called server for downVote comment for " + commentId)
        })


    }



    render() {
        const { posts, selectedPostId, comments } = this.props

        console.log("this.props.comments: " + JSON.stringify(comments))

        let selectedPost = {}
        if (posts && selectedPostId && posts.byId[selectedPostId] && !posts.byId[selectedPostId].deleted ) {
            selectedPost = posts.byId[selectedPostId]
        }

        let selectedPostComments = [];
        if (comments && comments.byId) {
            selectedPostComments = Object.values(comments.byId).filter(comment => comment.parentId === selectedPostId )

            // remove the null comments
            selectedPostComments = selectedPostComments.filter( comment => !comment.deleted && !comment.parentDeleted )
        }


            return (
                <tbody>
                {selectedPostComments.map(comment => {
                    console.log("Processing comment: " + JSON.stringify(comment))
                    return comment ? (
                        <tr key={comment.id} id={comment.id}>
                                <td>
                                    <div className="commentSubtext">
                                      <span className="subtext">
                                          {comment.voteScore} votes |
                                          {comment.author} |
                                           {new Date(comment.timestamp).toDateString()} {new Date(comment.timestamp).toLocaleTimeString()} |
                                          <span onClick={this.upVoteComment.bind(this, comment.id)}>Vote Up <FaCaretUp size="14"/> | </span>
                                          <span onClick={this.downVoteComment.bind(this, comment.id)}>Vote Down <FaCaretDown size="14"/> | </span>
                                          <button name="editButton" onClick={this.handleOpenModal.bind(this, comment.id)}>Edit </button> |
                                          <button name="deleteComment" onClick={this.deleteComment.bind(this, selectedPostId, comment.id)}>Delete</button>
                                      </span>
                                   </div>
                                   <div className="commentText">{comment.body} </div>
                                    <ReactModal
                                        isOpen={this.state.showModal} style={customStyles}>
                                        <div><h4>Edit comment</h4></div>
                                        <div>
                                          <textarea name="editComment" defaultValue={this.state.selectedComment.body} onChange={this.handleCommentChange} />
                                        </div>
                                        <div>
                                         <button onClick={this.handleCloseModal}>Submit</button>
                                        </div>
                                    </ReactModal>
                                </td>
                            </tr>
                        )
                    :  <p>No Comments</p>
                })}
                </tbody>
            )

    }

}

function mapStateToProps(state) {
    console.log("CommentList state.comments: " + JSON.stringify(state.posts.comments))
    return {
        posts: state.posts.posts,
        selectedPostId: state.posts.selectedPostId,
        comments: state.posts.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (data) => dispatch(updateComment(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
        upVoteComment: (data) => dispatch(upVoteComment(data)),
        downVoteComment: (data) => dispatch(downVoteComment(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)

