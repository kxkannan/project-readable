import React, {Component} from 'react'
import {connect} from 'react-redux'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'

class PostItem extends Component {

    render() {
        const {postKeys, posts, upVote, downVote} = this.props

        return (
            <table className="posts" key="posts_table">
                {postKeys.map(function (postKey, idx) {
                     return (   <tbody>
                        <tr key="{postKey.toString()}_title">
                            <td className="postNumber">{idx + 1}.</td>
                            <td className="postTitle">
                                <span className="postTitle">{posts.byId[postKey].title}</span>
                                <span className="author">({posts.byId[postKey].author})</span>
                            </td>
                        </tr>
                        <tr key="{postKey.toString()}_subtext">
                            <td colSpan="1"></td>
                            <td className="subtext">
                                <span>{posts.byId[postKey].voteScore} votes | </span>
                                <span>{new Date(posts.byId[postKey].timestamp).toDateString()} {new Date(posts.byId[postKey].timestamp).toLocaleTimeString()} | </span>
                                <span>{posts.byId[postKey].commentCount} comments | </span>
                                <span onClick={() => upVote(postKey)}>Vote Up <FaCaretUp size="14"/> | </span>
                                <span onClick={() => downVote(postKey)}>Vote Down <FaCaretDown size="14"/> | </span>
                                <span>Edit | </span>
                                <span>Delete</span>
                            </td>
                        </tr>
                        </tbody>
                     )
                    }
                )}
            </table>


        )


    }
}

export default PostItem
