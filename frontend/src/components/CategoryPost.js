import React, {Component} from 'react'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class CategoryPost extends Component {

    upVote = (postId) => {
        console.log(" category post upVote called - " + postId)
    }

    downVote = (postId) => {
        console.log(" category post downVote called " + postId)
    }


    render() {
        const { posts } = this.props.posts


        let postIds = Object.keys(posts)
        let postKeys = postIds ? Object.keys(posts.byId) : []

        if (postKeys) {
            return (
                <div className="categoryPosts">
                    <table className="posts" key="posts_table">
                        {postKeys.map(function (key, idx) {
                            var bodyKey = "body_" + idx
                            return (
                                <tbody key={bodyKey}>
                                    <tr key="{key.toString()}_title">
                                        <td className="postNumber">{idx + 1}.</td>
                                        <td className="postTitle">
                                            <span className="postTitle">{posts.byId[key].title}</span>
                                            <span className="author">({posts.byId[key].author})</span>
                                        </td>
                                    </tr>
                                    <tr key="{key.toString()}_subtext">
                                        <td colSpan="1"></td>
                                        <td className="subtext">
                                          <span>{posts.byId[key].voteScore} votes | </span>
                                          <span>{new Date(posts.byId[key].timestamp).toDateString()} {new Date(posts.byId[key].timestamp).toLocaleTimeString()} | </span>
                                          <span>{posts.byId[key].commentCount} comments | </span>
                                          <span onClick={() => this.upVote(key)}>Vote Up <FaCaretUp size="14"/> | </span>
                                          <span onClick={() => this.downVote(key)}>Vote Down <FaCaretDown size="14"/> | </span>
                                          <span>Edit | </span>
                                          <span>Delete</span>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>
            );
        }
    }
}

function mapStateToProps(posts) {
  return {
      posts
  }
}

export default connect(mapStateToProps)(CategoryPost);