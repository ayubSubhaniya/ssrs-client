import React, { Component } from 'react';

class News extends Component {
  render() {
    return (
       <div className='news-content'>
            <ul>
                {
                    this.props.news.map(news => 
                    (<li>{news.message}</li>)
                )
            }
            </ul>
        </div>
    );
  }
}

export default News;
