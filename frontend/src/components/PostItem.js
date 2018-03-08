import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import {downVotePost, upVotePost} from "../actions";

class PostItem extends Component {

    render() {
        const {selectedCategory, upVote, downVote, editPost, deletePost} = this.props
        const { posts } = this.props.posts

        console.log("posts in PostItem " + JSON.stringify(posts))
        let filteredPosts = (selectedCategory === null || selectedCategory === "all") ? Object.values(posts.byId)  : Object.values(posts.byId).filter( (post) => post.category === selectedCategory)
        console.log("selectedCategory: " + selectedCategory + "  filteredPosts: " + JSON.stringify(filteredPosts))

        return (
            <table className="posts" key="posts_table">
                {filteredPosts.map(function (post, idx) {
                    let bodyKey = "bodyKey_" + idx
                    let postItemUrl = '/' + post.category + '/' + post.id

                    console.log("post: " + JSON.stringify(post))
                     return (
                       <tbody key={bodyKey}>
                        <tr key="{post.id.toString()}_title">
                            <td className="postNumber">{idx + 1}.</td>
                            <td className="postTitle">
                                <Link to={postItemUrl} >
                                  <span className="postTitle">{post.title}</span>
                                </Link>
                                <span className="author">({post.author})</span>
                            </td>
                        </tr>
                        <tr key="{post.id.toString()}_subtext">
                            <td colSpan="1"></td>
                            <td className="subtext">
                                <span>{post.voteScore} votes | </span>
                                <span>{new Date(post.timestamp).toDateString()} {new Date(post.timestamp).toLocaleTimeString()} | </span>
                                <span>{post.commentCount} comments | </span>
                                <span onClick={() => upVote(post.id)}>Vote Up <FaCaretUp size="14"/> | </span>
                                <span onClick={() => downVote(post.id)}>Vote Down <FaCaretDown size="14"/> | </span>
                                <span><button onClick={() => editPost(post.id)}>Edit</button>| </span>
                                <span><button onClick={() => deletePost(post.id)}>Delete</button></span>
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

function mapStateToProps(posts) {
    return {
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteUp: (data) => dispatch(upVotePost(data)),
        voteDown: (data) => dispatch(downVotePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
