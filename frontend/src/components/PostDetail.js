import React, {Component} from 'react'
import {connect} from 'react-redux'
// import FaCaretUp from 'react-icons/lib/fa/caret-up'
// import FaCaretDown from 'react-icons/lib/fa/caret-down'

class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: props.match.params.category,
            postId: props.match.params.postId,
            post: {}
        };
    }

    componentDidMount() {
        console.log("componentDidMount posts: " + JSON.stringify(this.props.posts) + "  this.state.postId: " + this.state.postId)
        if (Object.keys(this.props.posts.posts.byId).includes(this.state.postId)) {
          let selectedPost = this.props.posts.posts.byId[this.state.postId]
          this.setState({post: selectedPost})
        }
    }

    updatePostBody = (body) => {
        console.log("updating the post body" + (body))
    }

    render() {
        // const { posts } = this.props.posts
        const { category, postId, post } = this.state

        console.log("PostDetail called " + postId)
        console.log("post.body: " + JSON.stringify(this.state.post.body))

        // let post = posts.byId[postId]

        if (post.body) {
            return (
                <table>
                <tbody>
                  <tr>
                    <td>
                      <span className="postTitle">{post.title}</span>
                      <span className="author">({post.author})</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="subtext">
                        <span>{post.voteScore} votes | </span>
                        <span>{new Date(post.timestamp).toDateString()} {new Date(post.timestamp).toLocaleTimeString()} | </span>
                        <span>{post.commentCount} comments | </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="post-body">{post.body}</p>
                    </td>
                  </tr>
                  <tr>
                      <td>
                          <button type="submit" onClick={this.updatePostBody(post.body)}>Update</button>
                      </td>
                  </tr>
                 </tbody>
                </table>
            )
        }
        else {
            return ( <p></p> )
        }
    }
}

function mapStateToProps(posts) {
    return { posts }
}

function mapDispatchToProps(data) {

}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
