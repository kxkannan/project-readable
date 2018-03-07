import React, {Component} from 'react'

import { connect } from 'react-redux'
import PostItem from './PostItem';
import PropTypes from 'prop-types'
import {downVotePost, upVotePost} from "../actions";

class CategoryPost extends Component {

    upVote = (postId) => {
        this.props.voteUp({postId: postId, posts: this.props.posts })
    }

    downVote = (postId) => {
        this.props.voteDown({postId: postId, posts: this.props.posts })
    }


    render() {
        const { posts } = this.props.posts

        let postIds = Object.keys(posts)
        let postKeys = postIds ? Object.keys(posts.byId) : []

        if (postKeys) {
            return (
                <div className="categoryPosts">
                  <PostItem postKeys={postKeys} posts={posts} upVote={this.upVote} downVote={this.downVote} />
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