import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updatePost } from "../actions";
import Comment from './Comment'
import CommentInfo from './CommentInfo'

class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
        }

        this.handleChange   = this.handleChange.bind(this)
        this.updatePostBody = this.updatePostBody.bind(this)
    }

    handleChange = (event) => {
        this.setState({description: event.target.value})
    }

    updatePostBody = (event) => {
        event.preventDefault();
        console.log("updatePostBody: " + JSON.stringify(this.props))
        this.props.updatePost({postId: this.props.selectedPostId, body: this.state.description})
        this.props.history.push('/')
    }

    componentDidMount() {
        let posts = this.props.posts
        let selectedPostId = this.props.selectedPostId
        let body = (posts && selectedPostId) ? posts.byId[selectedPostId].body : ""
        this.setState({
            description: body
        })
    }

    render() {
        const { posts, selectedPostId, edit, comments } = this.props

        let selectedPost = (posts && selectedPostId) ? posts.byId[selectedPostId] : {}
        let newCommentBox = <Comment postId={selectedPostId} />

        let commentIds = selectedPost.comments
        console.log("commentIds: " + commentIds)
        let selectedPostComments = []
        if (comments && comments.byId) {
            selectedPostComments = Object.keys(comments.byId).map(commentId => {
                console.log("map commentId: " + commentId)
                if (commentIds.includes(commentId)) {
                    return comments.byId[commentId]
                }
            })
        }

        // remove the null comments
        selectedPostComments = selectedPostComments.filter( comment => comment )

        console.log("PostDetail selectedPost: " + JSON.stringify(selectedPost))
        console.log("PostDetail selectedPost comments: " + JSON.stringify(selectedPostComments))

        if (selectedPost && !edit) {
            return (

                    <table>
                        <tbody>
                        <tr><td>&nbsp;</td></tr>
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
                                <span>{new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()}  |</span>
                                <span>{selectedPostComments.length} comments |</span>
                            </td>
                        </tr>
                        <tr className="bodyContainer">
                            <td>
                                <p className="showPostBody">{selectedPost.body}</p>
                            </td>
                        </tr>
                        {newCommentBox}
                        <tr><td><hr className="separator"></hr></td></tr>
                        <CommentInfo comments={selectedPostComments} />
                        </tbody>
                    </table>
            )
        }
        else if (selectedPost && edit) {
            return (
                <form onSubmit={this.updatePostBody}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div className="editablePost">
                                  <span className="postTitle">{selectedPost.title}</span>
                                  <span className="author">({selectedPost.author})</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="subtext">
                                <span>{selectedPost.voteScore} votes | </span>
                                <span>{new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()}
                                    | </span>
                                <span>{selectedPost.commentCount} comments | </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="editablePostBody">
                                <textarea className="post-body" value={this.state.description}
                                          onChange={this.handleChange}></textarea>
                                 </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Update"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            )
        }
        else {
            return ( <p>No selected Post</p> )
        }
    }
}

function mapStateToProps( state ) {
    console.log("PostDetail mapStateToProps state: " + JSON.stringify(state))
    return {
        posts: state.posts.posts,
        selectedPostId: state.posts.selectedPostId,
        edit: state.posts.edit,
        comments: state.posts.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
