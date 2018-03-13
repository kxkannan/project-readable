import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updatePost } from "../actions";
import CommentList from './CommentList'
import LineSeparator from "./LineSeparator";

class PostDetailEditable extends Component {
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
        const { posts, selectedPostId } = this.props

        let selectedPost = {}
        if (posts && selectedPostId && posts.byId[selectedPostId] && !posts.byId[selectedPostId].deleted ) {
            selectedPost = posts.byId[selectedPostId]
        }

        return (
            <form onSubmit={this.updatePostBody}>
                <table>
                    <tbody>
                    <tr className="showPostTitle">
                        <td>
                           <span className="showPostTitle">{selectedPost.title}</span>
                           <span className="showAuthor">({selectedPost.author})</span>
                        </td>
                    </tr>
                    <tr className="showSubtext">
                        <td className="showSubtext">
                            <span>{selectedPost.voteScore} votes | </span>
                            <span>{new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()}
                                | </span>
                            <span>{selectedPost.comments.length} comments | </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <textarea className="editablePostBody" value={this.state.description}
                                          onChange={this.handleChange}></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr className="updatePostButton">
                        <td>
                            <input className="updatePostButton" type="submit" value="Update Post"/>
                        </td>
                    </tr>
                    </tbody>
                    <LineSeparator/>
                    <CommentList />
                </table>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailEditable)