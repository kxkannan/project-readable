import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updatePost } from "../actions";

// import FaCaretUp from 'react-icons/lib/fa/caret-up'
// import FaCaretDown from 'react-icons/lib/fa/caret-down'

class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {description: ''}

        this.handleChange = this.handleChange.bind(this)
        this.updatePostBody = this.updatePostBody.bind(this)
    }

    handleChange = (event) => {
      console.log("handleChange called")
      this.setState({description: event.target.value})
    }

    updatePostBody = (event) => {
        event.preventDefault();
        this.props.updatePost({postId: this.props.posts.posts.selectedPostId, body: this.state.description })
        this.props.history.push('/')
    }

    componentDidMount() {
      let posts = this.props.posts.posts
      let selectedPostId = this.props.posts.posts.selectedPostId
      let body = (posts && selectedPostId) ? posts.byId[this.props.posts.posts.selectedPostId].body : ""
      this.setState({
          description: body
      })
    }

    render() {
        const { posts } = this.props.posts

        let selectedPost = posts ? posts.byId[posts.selectedPostId] : {}

        console.log("*** render state description: " + this.state.description)
        console.log("edit: " + !posts.edit + " selectedPost: " + JSON.stringify(selectedPost))

        if (selectedPost && !posts.edit) {
            return (
                <table>
                <tbody>
                  <tr>
                    <td>
                      <span className="postTitle">{selectedPost.title}</span>
                      <span className="author">({selectedPost.author})</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="subtext">
                        <span>{selectedPost.voteScore} votes | </span>
                        <span>{new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()} | </span>
                        <span>{selectedPost.commentCount} comments | </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{selectedPost.body}</p>
                    </td>
                  </tr>
                 </tbody>
                </table>
            )
        }
        else if (selectedPost && posts.edit) {
            return (
                <form onSubmit={this.updatePostBody}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <span className="postTitle">{selectedPost.title}</span>
                            <span className="author">({selectedPost.author})</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="subtext">
                            <span>{selectedPost.voteScore} votes | </span>
                            <span>{new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()} | </span>
                            <span>{selectedPost.commentCount} comments | </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea className="post-body" value={this.state.description} onChange={this.handleChange}></textarea>
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

function mapStateToProps(posts) {
    return {
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
