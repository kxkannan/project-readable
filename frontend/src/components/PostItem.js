import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import { downVotePost, upVotePost, showPostDetail, deletePost } from "../actions";
import * as CategoriesAPI from '../CategoriesAPI';

class PostItem extends Component {

    upVote = (postId) => {
        this.props.voteUp({postId: postId, posts: this.props.posts })
        CategoriesAPI.postVote(postId, {option: "upVote"}).then((response) => {
            console.log("Called server for upVotePost for " + postId)
        })
    }

    downVote = (postId) => {
        this.props.voteDown({postId: postId, posts: this.props.posts })
        CategoriesAPI.postVote(postId, {option: "downVote"}).then((response) => {
            console.log("Called server for downVotePost for " + postId)
        })
    }

    editPost = (postId) => {
        this.props.postDetail({postId: postId, edit: true})
    }

    deletePost = (postId) => {
        this.props.deletePost({postId: postId})
        CategoriesAPI.deletePost(postId).then((response) => {
            console.log("Deleting post from server for " + postId)
        })
    }

    selectedPost = (postId) => {
        this.props.postDetail({postId: postId, edit: false })
    }

    render() {
        const { selectedCategory } = this.props
        const { posts } = this.props.posts

        let filteredPosts = (selectedCategory === null || selectedCategory === "all") ? Object.values(posts.posts.byId).filter( post => !post.deleted )  :
                                      Object.values(posts.posts.byId).filter( (post) => post.category === selectedCategory && !post.deleted )

        return (
            <table className="posts" key="posts_table">
                {filteredPosts.map((post, idx) => {
                    let bodyKey = "bodyKey_" + idx
                    let postItemUrl = '/' + post.category + '/' + post.id

                     return (
                       <tbody key={bodyKey}>
                        <tr key="{post.id.toString()}_title">
                            <td className="postNumber">{idx + 1}.</td>
                            <td className="postTitle">
                                <Link to={postItemUrl} >
                                  <span className="postTitle" onClick={() => this.selectedPost(post.id)}>{post.title}</span>
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
                                <span onClick={() => this.upVote(post.id)}>Vote Up <FaCaretUp size="14"/> | </span>
                                <span onClick={() => this.downVote(post.id)}>Vote Down <FaCaretDown size="14"/> | </span>
                                <span>
                                    <Link to={'/' + post.category + '/' + post.id}>
                                      <span onClick={() => this.editPost(post.id)}>Edit |</span>
                                    </Link>
                                </span>
                                <span><button onClick={() => this.deletePost(post.id)}>Delete</button></span>
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
        voteDown: (data) => dispatch(downVotePost(data)),
        postDetail: (data) => dispatch(showPostDetail(data)),
        deletePost: (data) => dispatch(deletePost(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
