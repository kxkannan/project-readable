import React, {Component} from 'react'
import {connect} from 'react-redux'
import { addPost } from "../actions";

// import FaCaretUp from 'react-icons/lib/fa/caret-up'
// import FaCaretDown from 'react-icons/lib/fa/caret-down'

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            title: '',
            body: '',
            category: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.addNewPost   = this.addNewPost.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            title: event.target.value,
        })
    }

    handleBodyChange = (event) => {
       this.setState({
           body: event.target.value
       })
    }

    handleAuthorChange = (event) => {
        this.setState({
            author: event.target.value
        })
    }

    handleCategoryChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }

    generateId = () => {
        let id = ""
        let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i=0; i < 22; i++)
          id += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));

        return id;
    }

    addNewPost = (event) => {
        event.preventDefault();
        let newPost = {
            ...this.state,
            timestamp: Date.now(),
            id: this.generateId(),
            voteScore: 0,
            deleted: false,
            comments: []
        }
        this.props.addPost([newPost])
        this.props.history.push('/')
    }


    render() {
        return (
            <form onSubmit={this.addNewPost}>
                <table className="newPost">
                    <tbody>
                    <tr>
                        <td><label>Title:</label></td>
                        <td> <input type="text" name="title" id="title" value={this.state.title} onChange={this.handleChange} /> </td>
                    </tr>
                    <tr>
                        <td><label>Body:</label></td>
                        <td> <input name="body" id="body" value={this.state.body} onChange={this.handleBodyChange}/> </td>
                    </tr>
                    <tr>
                        <td><label>Author:</label></td>
                        <td> <input name="author" id="author" value={this.state.author} onChange={this.handleAuthorChange}/> </td>
                    </tr>
                    <tr>
                        <td><label>Category:</label></td>
                        <td> <input name="category" id="category" value={this.state.category} onChange={this.handleCategoryChange}/> </td>
                    </tr>
                    <tr>
                        <td>
                            <input disabled={!(this.state.title && this.state.body && this.state.author && this.state.category)} className="commentButton" type="submit" value="Add Post"/>
                        </td>
                    </tr>
                    </tbody>
                </table>


            </form >
        )
    }

}

function mapStateToProps(posts) {
    return {
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (data) => dispatch(addPost(data)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
