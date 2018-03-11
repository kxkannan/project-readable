import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import { updateComment, deleteComment } from "../actions";


class CommentInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
           showModal: false,
           commentId: null,
           updatedComment: ""

        }

    }

    deleteComment = (postId, commentId, event) => {
        console.log("deleteComment clicked event target")
        console.log("deleteComment postId: " + postId + " commentId: " + commentId)
        this.props.deleteComment( {postId, commentId })
    }

    handleOpenModal = (commentId, event) => {
        console.log("Open Model for comment id: " + commentId)
        this.setState({showModal: true,
                       commentId: commentId})
    }

    handleCloseModal = (event) => {
        event.preventDefault();
        this.props.updateComment({commentId: this.state.commentId,
            updatedComment: this.state.updatedComment})
        this.setState({showModal: false, comment_id: null, updatedComment: ""})
    }

    handleCommentChange = (event) => {
       this.setState({updatedComment: event.target.value })
       this.props.updateComment({commentId: this.state.commentId,
            updatedComment: this.state.updatedComment})
    }

    render() {
        const { postId, comments } = this.props

        console.log("CommentInfo comments: " + JSON.stringify(comments))


            return (
                <tbody>
                {comments.map(comment => {
                    if (comment) {
                        return (<tr key={comment.id}>
                                <td>
                                    <div className="commentSubtext">
                                      <span className="subtext">{comment.author} |
                                         {new Date(comment.timestamp).toDateString()} {new Date(comment.timestamp).toLocaleTimeString()} |
                                         {comment.voteScore} votes | <button name="editButton" onClick={this.handleOpenModal.bind(this, comment.id)}>Edit
                                       </button> | <button name="deleteComment" onClick={this.deleteComment.bind(this, postId, comment.id)}>Delete</button>
                                      </span>
                                   </div>
                                   <div className="commentText">{comment.comment} </div>
                                    <ReactModal
                                        isOpen={this.state.showModal}>
                                        <textarea name="editComment" defaultValue={comment.comment} onChange={this.handleCommentChange} />
                                        <button onClick={this.handleCloseModal}>Submit</button>
                                    </ReactModal>
                                </td>
                            </tr>
                        )
                    }
                    else {
                        <p>No Comments</p>
                    }
                })}
                </tbody>
            )

    }

}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (data) => dispatch(updateComment(data)),
        deleteComment: (data) => dispatch(deleteComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInfo)

