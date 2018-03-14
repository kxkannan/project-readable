import React, {Component} from 'react'
import {connect} from 'react-redux'
import { updatePost } from "../actions";
import CommentList from './CommentList'
import LineSeparator from "./LineSeparator";
import * as CategoriesAPI from '../CategoriesAPI';

class PostDetailEditable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        }

        this.handleChange        = this.handleChange.bind(this)
        this.handleTitleChange   = this.handleTitleChange.bind(this)
        this.updatePostBody      = this.updatePostBody.bind(this)
    }

    handleChange = (event) => {
        this.setState({description: event.target.value})
    }

    handleTitleChange = (event) => {
      this.setState({title: event.target.value})
    }

    updatePostBody = (event) => {
        event.preventDefault();
        this.props.updatePost({postId: this.props.selectedPostId, body: this.state.description, title: this.state.title})
        CategoriesAPI.editPost(this.props.selectedPostId, {title: this.state.title, body: this.state.description}).then((response) => {
            console.log("Called server for update post for " + this.props.selectedPostId)
        })
        this.props.history.push('/')
    }

    componentDidMount() {
        let posts = this.props.posts
        let selectedPostId = this.props.selectedPostId
        let title = (posts && selectedPostId) ? posts.byId[selectedPostId].title : ""
        let body = (posts && selectedPostId) ? posts.byId[selectedPostId].body : ""
        this.setState({
            title:  title,
            description: body
        })
    }

    render() {

        return (
            <form onSubmit={this.updatePostBody}>
                <table>
                    <tbody>
                    <tr className="showPostTitle">
                        <td>
                           <input type="text" className="editPostTitle" value={this.state.title} onChange={this.handleTitleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <textarea className="editablePostBody" value={this.state.description} onChange={this.handleChange}></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr className="updatePostButton">
                        <td>
                            <input className="updatePostButton" type="submit" value="Update Post"/>
                        </td>
                    </tr>
                    </tbody>
                    <LineSeparator/>
                    <CommentList />
                </table>
            </form>
        )
    }

}

function mapStateToProps( state ) {
    return {
        posts: state.posts.posts,
        selectedPostId: state.posts.selectedPostId,
        comments: state.posts.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailEditable)