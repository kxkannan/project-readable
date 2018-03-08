import React, {Component} from 'react';
import { connect } from 'react-redux'
import PostItem from './PostItem';
import {downVotePost, upVotePost} from "../actions";
import { Route } from 'react-router-dom'

class CategoryPost extends Component {

    upVote = (postId) => {
        this.props.voteUp({postId: postId, posts: this.props.posts })
    }

    downVote = (postId) => {
        this.props.voteDown({postId: postId, posts: this.props.posts })
    }

    editPost = (postId) => {
       console.log("Edit post " + JSON.stringify(postId))
    }

    deletePost = (postId) => {
        console.log("Delete post " + JSON.stringify(postId))
    }


    render() {
        const { posts } = this.props.posts

        let selectedCategory = this.props.selectedCategory ? this.props.selectedCategory : "all"

        console.log("selectedCategory in CategoryPost: " + selectedCategory)
        if (posts) {
            return (
                <div className="categoryPosts">
                  <PostItem selectedCategory={selectedCategory} upVote={this.upVote}
                            downVote={this.downVote}
                            editPost={this.editPost}
                            deletePost={this.deletePost}
                  />
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

function mapDispatchToProps(dispatch) {
   return {
       voteUp: (data) => dispatch(upVotePost(data)),
       voteDown: (data) => dispatch(downVotePost(data))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPost);
