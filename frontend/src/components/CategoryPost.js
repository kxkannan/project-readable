import React, {Component} from 'react';
import { connect } from 'react-redux'
import PostItem from './PostItem';
import {downVotePost, upVotePost} from "../actions";

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
        const { selectedCategory } = this.props.selectedCategory
        const { posts } = this.props.posts

        console.log("posts: " + JSON.stringify(posts))
        console.log("props category: " + selectedCategory)
        let filteredPosts = Object.values(posts.byId).filter( (post) => post.category.name === selectedCategory)

        let postIds = Object.keys(posts)
        let postKeys = postIds ? Object.keys(posts.byId) : []

        if (postKeys) {
            return (
                <div className="categoryPosts">
                  <PostItem postKeys={postKeys} posts={posts} upVote={this.upVote}
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