import React, { Component } from "react";
import Demo from "./Demo";
import Tour from "reactour";
import css from "./styles.css";
import Text from "./Text";
import Tooltip from "./Tooltip";
import { Link } from "./Button";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isTourOpen: false,
      isShowingMore: false
    };
  }

 
  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    const { isTourOpen, isShowingMore } = this.state;
    const accentColor = '#5cb7b7'
    return (
      <div>
        <Demo
          openTour={this.openTour}
          toggleShowMore={this.toggleShowMore}
          isShowingMore={isShowingMore}
        />
        <Tour
          onRequestClose={this.closeTour}
          steps={tourConfig}
          isOpen={isTourOpen}
          maskClassName="mask"
          className="helper"
          rounded={5}
          accentColor={accentColor}
        />
      </div>
    );
  }
}

const tourConfig = [
  {
    selector: '[data-tut="reactour__iso"]',
    content: `Ok, let's start with the name of the Tour that is about to begin.`
  },

  {
    selector: '[data-tut="reactour__copy"]',
    content: `Keep in mind that you could try and test everithing during the Tour. 
      For example, try selecting the highlighted text…`
  },
 
  {
    selector: '[data-tut="reactour__goTo"]',
    content: ({ goTo }) =>
      <div>
        If you wanna go anywhere, skipping places, it is absolutely possible.
        <br /> "Oh, I forgot something inside the bus…"{" "}
        <button
          style={{
            border: "1px solid #f7f7f7",
            background: "none",
            padding: ".3em .7em",
            fontSize: "inherit",
            display: "block",
            cursor: "pointer",
            margin: "1em auto"
          }}
          onClick={() => goTo(1)}
        >
          Please go back to 🚌
        </button>
      </div>
  },
  
  
];

export default App;
