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

  componentDidMount() {
    CategoriesAPI.categories().then((categories) => {
        console.log("componentDidMount - categories: " + JSON.stringify(categories))
      this.setState({categories})
    })

    CategoriesAPI.all_posts().then((response) => {
      console.log("componentDidMount posts: " + JSON.stringify(response))
      this.setState({defaultCategoryPosts: response})
      console.log("componentDidMount - defaultCategoryPosts: " + JSON.stringify(this.state.defaultCategoryPosts))
    }).catch((err) => {
          console.log("Error response for all_posts: " + JSON.stringify(err));
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

                        },
                        {
                            "id": "6ni6ok3ym7mf1p33lnez",
                            "timestamp": 1468479767190,
                            "title": "Learn Redux in 10 minutes!",
                            "body": "Just kidding. It takes more than 10 minutes to learn technology.",
                            "author": "thingone",
                            "category": "redux",
                            "voteScore": -5,
                            "deleted": false,
                            "commentCount": 0
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
