import React, {Component} from 'react';
import { connect } from 'react-redux'
import PostItem from './PostItem';
import {downVotePost, upVotePost} from "../actions";
import { Route } from 'react-router-dom'

class CategoryPost extends Component {

    render() {
        const { posts } = this.props.posts

        let selectedCategory = this.props.selectedCategory ? this.props.selectedCategory : "all"

        if (posts) {
            return (
                <div className="categoryPosts">
                  <PostItem selectedCategory={selectedCategory} />
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
