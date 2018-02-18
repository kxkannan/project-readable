import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CategoryPost extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired
    }

    render() {
        const { posts } = this.props

        console.log("CategoryPost posts: " + JSON.stringify(posts))
        return (
            <div className="categoryPosts">
            <ol>
            {posts.map(function(post) {
                return <li className="postTitle">{post.title}</li>
            })}
            </ol>
            </div>
        );
    }
}

export default CategoryPost;