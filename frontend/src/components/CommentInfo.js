import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import { updateComment } from "../actions";


class CommentInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
           showModal: false,
           commentId: null,
           updatedComment: ""

        }

        this.editComment = this.editComment.bind(this)

    }

    editComment = (event) => {
        console.log("editComment clicked event target " + event.target.value)
        this.setState({editing: true})
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
       console.log("editingComment: " + event.target.value)
       this.setState({updatedComment: event.target.value })
       this.props.updateComment({commentId: this.state.commentId,
            updatedComment: this.state.updatedComment})
    }

    render() {
        const { comments } = this.props
        const { editing } = this.state

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
                                       </button> | <button name="deleteComment">Delete</button>
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
        updateComment: (data) => dispatch(updateComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInfo)

