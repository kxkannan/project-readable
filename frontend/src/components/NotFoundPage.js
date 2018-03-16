import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'



class NotFoundPage extends Component {

    render() {
        if (!this.props.selectedPostId) {
            return (
                <div>
                    <h3>Sorry, the page you are looking for is not found</h3>
                    <p><Link to="/">Back to Home</Link></p>
                </div>
            )
        }
        else {
            return null
        }
    }
}

function mapStateToProps(posts) {
    return {
       selectedPostId: posts.posts.selectedPostId
    }
}

export default connect(mapStateToProps)(NotFoundPage)