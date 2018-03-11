import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



class CategoryMenu extends Component {


    render() {
        const { posts } = this.props

        let categories = posts.posts.categories
        console.log("categories: " + categories)

        return (
            <div className="header category-menu">
              <span className="title"><Link to="/">Readble</Link></span>
              {categories.map((item, index) => (
                  <span className='category' key={index}><Link to={'/' + item}>{item}</Link></span>
               ))}
             <span className="menu-actions"><Link to="/new_post">Submit Post</Link></span>
             <span className="menu-actions">Order By:</span>
             <span className="sort-order">VoteScore |</span>
             <span className="sort-order">Timestamp</span>
            </div>
        );

    }
}

function mapStateToProps(posts) {
    return {
        posts
    }
}

export default connect(mapStateToProps)(CategoryMenu);