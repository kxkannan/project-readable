import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
            <span className="title">Readble</span>
              {categories.map((item, index) => (
                  <span className='category' key={index}>{item.name}</span>
               ))}
            </div>
        );

    }
}

export default CategoryMenu