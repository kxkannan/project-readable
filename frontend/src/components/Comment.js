import React, {Component} from 'react'
import {connect} from 'react-redux'
import { addComment }  from '../actions/comment_action_creators'
import * as CategoriesAPI from "../CategoriesAPI";

class Comment extends Component {

    constructor(props){
        super(props)
        this.state = {
            comment: "",
            author: ""
        }

        this.addComment   = this.addComment.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    generateId = () => {
        let id = ""
        let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i=0; i < 22; i++)
            id += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));

        return id;
    }

    addComment = (event) => {
        event.preventDefault();
        let commentId = this.generateId()
        let newComment = {
            id: commentId,
            parentId: this.props.selectedPostId,
            body: this.state.comment,
            author: this.state.author,
            timestamp: Date.now(),
            deleted: false,
            parentDeleted: false,
            voteScore: 0
        }
        this.props.addComment({ postId: this.props.selectedPostId, comment: newComment })
        this.setState({comment: "", author: ""})
        CategoriesAPI.addComment(newComment).then((response) => {
            console.log("Called server for adding comment for " + commentId)
        })
    }

    handleChange = (event) => {
        this.setState({comment: event.target.value})
    }

    handleAuthorChange = (event) =>  {
        this.setState({author: event.target.value})
    }

    render() {
        const { comment, author } = this.state

        return (
            <tbody>
            <tr className="newComment">
                <td>
                    <form onSubmit={this.addComment}>
                      <div className="newComment">
                            <textarea className="newCommentTextArea" value={comment} onChange={this.handleChange}></textarea>
                      </div>
                      <div className="newCommentAuthor">
                        <span>
                          <label>Author: </label>
                          <input name="comment" className="commentInput"  value={author} onChange={this.handleAuthorChange} />
                          <button disabled={!(this.state.comment && this.state.author)} className="commentButton" onClick={this.addComment}>Add Comment</button>
                        </span>
                      </div>
                    </form>
                </td>
            </tr>
            </tbody>
        )
    }

}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        selectedPostId: state.posts.selectedPostId,
    }

}

function mapDispatchToProps(dispatch){
    return {
        addComment: (data) => dispatch(addComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
