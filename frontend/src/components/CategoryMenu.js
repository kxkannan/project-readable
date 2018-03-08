import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



class CategoryMenu extends Component {

    static propTypes = {
        categories: PropTypes.array.isRequired
    }

    render() {
        const { categories } = this.props

        console.log("CategoryMenu categories: " + JSON.stringify(categories))
        categories.map((item, index) => (
            console.log("item - " + JSON.stringify(item) + " index: " + index)
        ))
        return (
            <div className="header category-menu">
                <span className="title"><Link to="/">Readble</Link></span>
              {categories.map((item, index) => (
                  <span className='category' key={index}><Link to={'/' + item.name}>{item.name}</Link></span>
               ))}
             <span className="menu-actions">Submit Post</span>
             <span className="menu-actions">Order By:</span>
             <span className="sort-order">VoteScore |</span>
             <span className="sort-order">Timestamp</span>
            </div>
        );

    }
}

export default CategoryMenu