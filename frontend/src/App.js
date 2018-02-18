import React, { Component } from 'react';
import './App.css';
import * as CategoriesAPI from './CategoriesAPI';
import CategoryMenu from './CategoryMenu';
import CategoryPost from './CategoryPost';

class App extends Component {
  state = {
    categories: [],
    defaultCategoryPosts: []
  }

  componentWillMount() {
    CategoriesAPI.categories().then((categories) => {
        console.log("componentDidMount - categories: " + JSON.stringify(categories))
      this.setState({categories})
      console.log("componentDidMount - defaultCategory: " + JSON.stringify(categories[0]));
    })

    CategoriesAPI.posts("react").then((posts) => {
      console.log("componentDidMount posts: " + JSON.stringify(posts))
      this.setState({defaultCategoryPosts: posts})
      console.log("componentDidMount - defaultCategoryPosts: " + JSON.stringify(this.state.defaultCategoryPosts))
    })

  }

  render() {
    console.log("app render - categories = " + JSON.stringify(this.state.categories))

    var defaultPosts = [{"id":"8xf0y6ziyjabvozdd253nd",
                         "timestamp":1467166872634,
                         "title":"Udacity is the best place to learn React",
                         "body":"Everyone says so after all.",
                         "author":"thingtwo",
                         "category":"react",
                         "voteScore":6,
                         "deleted":false,
                         "commentCount":2
                        },
                        {
                            "id":"8xf0y6ziyjabvozdd253nd",
                            "timestamp":1467166872634,
                            "title":"React course is awesome",
                            "body":"Everyone says so after all.",
                            "author":"HotReaact",
                            "category":"react",
                            "voteScore":2,
                            "deleted":false,
                            "commentCount":5

                        }]

    return (
      <div className="App">

        <CategoryMenu categories={this.state.categories} />

        <CategoryPost posts={defaultPosts} />

      </div>
    );
  }
}

export default App;
