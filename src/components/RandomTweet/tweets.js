import React,{useState,useEffect} from "react";
import { Tweet } from "react-twitter-widgets";
import shuffle from "shuffle-array";
import ids from "../../lib/tweets";
const tweetsarray = shuffle(ids);
import Loader from 'react-spinners/HashLoader'

const Tweets = () => {
  const [newTweets,setNewTweets] = useState([]);
  const [currentCount, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const override = `
  display: block;
  margin: 0 auto;
`;
  useEffect(() =>{
    setNewTweets( [...newTweets,tweetsarray[currentCount]])
    const up = ()=>
    {
      if(currentCount + 1 !== tweetsarray.length)
      {
        setCount(currentCount +1)
      }
      else{
        setLoading(false)
      }
    }
    const interval = setTimeout(up, 1500);
    return () => clearTimeout(interval);
  },[currentCount]);
  
  return (
  <>
      {newTweets.map(id => (
      <Tweet key={id} tweetId={id} options={{ conversation: "none" }} />
      ))}
      <Loader color="#1da0f2" //twitter blue
      css={override} 
      loading={loading}
       size={200}/>
  </>
  );
  
}

export default Tweets;