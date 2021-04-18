import tweets from "../../content/tweets.yml";


export type TweetContent = {
  readonly id: string;
};

const tagMap: { [key: string]: TweetContent } = generateTagMap();

function generateTagMap(): { [key: string]: TweetContent } {
  let result: { [key: string]: TweetContent } = {};
  for (const tag of tweets.tweets) {
    result[tag.id] = tag;
  }
  return result;
}

export function getTag(id: string) {
  return tagMap[id];
}

export function listTags(): TweetContent[] {
  return tweets.tweets;
}

export default tweets.tweets;
