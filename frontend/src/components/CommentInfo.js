import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import ReactModal from 'react-modal'
import { updateComment, deleteComment, upVoteComment, downVoteComment } from "../actions";
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'

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
        this.props.deleteComment( {postId, commentId })
    }

    handleOpenModal = (commentId, event) => {
        this.setState({showModal: true,
                       commentId: commentId})
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

    }

    downVoteComment = (commentId, event) => {
        this.props.downVoteComment(commentId)

    }



    render() {
        const { postId, comments } = this.props


            return (
                <tbody>
                {comments.map(comment => {
                    if (comment) {
                        return (<tr key={comment.id}>
                                <td>
                                    <div className="commentSubtext">
                                      <span className="subtext">
                                          {comment.voteScore} votes |
                                          {comment.author} |
                                           {new Date(comment.timestamp).toDateString()} {new Date(comment.timestamp).toLocaleTimeString()} |
                                          <span onClick={this.upVoteComment.bind(this, comment.id)}>Vote Up <FaCaretUp size="14"/> | </span>
                                          <span onClick={this.downVoteComment.bind(this, comment.id)}>Vote Down <FaCaretDown size="14"/> | </span>
                                          <button name="editButton" onClick={this.handleOpenModal.bind(this, comment.id)}>Edit </button> |
                                          <button name="deleteComment" onClick={this.deleteComment.bind(this, postId, comment.id)}>Delete</button>
                                      </span>
                                   </div>
                                   <div className="commentText">{comment.comment} </div>
                                    <ReactModal
                                        isOpen={this.state.showModal} style={customStyles}>
                                        <div><h4>Edit comment</h4></div>
                                        <div>
                                          <textarea name="editComment" defaultValue={comment.comment} onChange={this.handleCommentChange} />
                                        </div>
                                        <div>
                                         <button onClick={this.handleCloseModal}>Submit</button>
                                        </div>
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
        deleteComment: (data) => dispatch(deleteComment(data)),
        upVoteComment: (data) => dispatch(upVoteComment(data)),
        downVoteComment: (data) => dispatch(downVoteComment(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInfo)

