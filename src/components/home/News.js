import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {timeSince} from "../../js/Time";

class News extends Component {
  render() {
      return (
          <ListGroup>
              {
                  this.props.news.map(
                      (news) => {
                        return <ListGroupItem key={news._id} header={news.message} href="#">
                              {timeSince(new Date(news.createdOn)) + ' ago'}
                          </ListGroupItem>

                      })
              }
          </ListGroup>
      );
  }
}
export default News;
