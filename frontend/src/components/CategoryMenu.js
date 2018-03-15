import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sortPosts } from "../actions";


class CategoryMenu extends Component {

    constructor(props) {
        super(props)
        this.sortPosts = this.sortPosts.bind(this)
    }

    sortPosts = (sortBy, event) => {
       this.props.sortPosts({sortBy})
    }

    render() {
        const { posts } = this.props

        let categories = posts.posts.categories

        return (
            <div className="header category-menu">
              <span><Link to="/" className="title">Readble</Link></span>
              {categories.map((item, index) => (
                  <span className='category' key={index}><Link to={'/' + item}>{item}</Link></span>
               ))}
             <span className="menu-actions"><Link to="/new_post" className="submitPost">Add new post</Link></span>
             <span className="menu-actions">Order By:</span>
             <span className="sort-order" onClick={this.sortPosts.bind(this, "votes")}>VoteScore |</span>
             <span className="sort-order" onClick={this.sortPosts.bind(this, "timestamp")}>Timestamp</span>
            </div>
        );

    }
}

function mapStateToProps(posts) {
    return {
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sortPosts: (data) => dispatch(sortPosts(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);