import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import { connect } from 'react-redux'

class CategoryPost extends Component {

    render() {
        console.log("store posts: " + JSON.stringify(this.props.posts))
        console.log("CategoryPost posts: " + JSON.stringify(this.props.posts))
        return (
            <div className="categoryPosts">
            <table className="posts">
            {this.props.posts.map(function(post, idx) {
                console.log("key: " + post.id.toString())
                return (
                    <div key="{post.id.toString()}">
                    <tr>
                      <td className="postNumber">{idx + 1}.</td>
                      <td className="postTitle">
                        <span className="postTitle">{post.title}</span>
                        <span className="author">({post.author})</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="1"></td>
                      <td className="subtext">
                        <td className="subtext">
                          <span>{post.voteScore} votes | </span>
                          <span>{new Date(post.timestamp).toDateString()} {new Date(post.timestamp).toLocaleTimeString()} | </span>
                          <span>{post.commentCount} comments | </span>
                          <span>Vote Up <FaCaretUp size="14" /> | </span>
                          <span>Vote Down <FaCaretDown  size="14"/> | </span>
                          <span>Edit | </span>
                          <span>Delete</span>
                        </td>
                      </td>
                    </tr>
                   </div>
                )
            })}
            </table>
            </div>
        );
    }
}

function mapStateToProps(posts) {
  return {
      posts
  }
}

export default connect(mapStateToProps)(CategoryPost);