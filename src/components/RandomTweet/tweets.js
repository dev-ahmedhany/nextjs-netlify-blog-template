import React from "react";
import { Tweet } from "react-twitter-widgets";
import shuffle from "shuffle-array";
import ids from "../../lib/tweets";

class Tweets extends React.Component {
  state = {
    tweets: shuffle(ids)
  };
  render() {
    return (
    <>
        {this.state.tweets.map(id => (
        <Tweet key={id} tweetId={id} options={{ conversation: "none" }} />
        ))}
    </>
    );
  }
}

export default Tweets;