import React, {Component} from 'react'
import { Link } from 'react-router-dom'


class NotFoundPage extends Component {

    render() {
        return (
            <div>
                <h3>Sorry, the page you are looking for is not found</h3>
                <p><Link to="/">Back to Home</Link></p>
            </div>
        )
    }
}

export default NotFoundPage