import React from "react";
import styles from "../../public/styles/content.module.css";
import Copyright from "../components/Copyright";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import Tweets from "../components/RandomTweet/tweets";

export default function TweetsPage() {
  const title = "Encouragement Tweets";
  const description="Some words of encouragement!"
  const url="/tweets"
  return (
    <Layout>
      <BasicMeta
        url={url}
        title={title}
        description={description}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={description}
      />
      <div className={"container"}>
        <article>
          <header>
            <h1>{title}</h1>
          </header>
          <div className={styles.content}><Tweets/></div>
        </article>
        <footer>
          <div className={"social-list"}>
            <SocialList />
          </div>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
            .container {
              display: block;
              max-width: 36rem;
              width: 100%;
              margin: 0 auto;
              padding: 0 1.5rem;
              box-sizing: border-box;
              z-index: 0;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
            }
            article {
              flex: 1 0 auto;
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .tag-list {
              list-style: none;
              text-align: right;
              margin: 1.75rem 0 0 0;
              padding: 0;
            }
            .tag-list li {
              display: inline-block;
              margin-left: 0.5rem;
            }
            .social-list {
              margin-top: 3rem;
              text-align: center;
            }

            @media (min-width: 769px) {
              .container {
                display: flex;
                flex-direction: column;
              }
            }
          `}
      </style>
      <style global jsx>
        {`
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata,
            .token.plain-text {
              color: #6a737d;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword,
            .token.operator {
              color: #d73a49;
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #22863a;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #032f62;
            }

            .token.function,
            .token.class-name {
              color: #6f42c1;
            }

            /* language-specific */

            /* JSX */
            .language-jsx .token.punctuation,
            .language-jsx .token.tag .token.punctuation,
            .language-jsx .token.tag .token.script,
            .language-jsx .token.plain-text {
              color: #24292e;
            }

            .language-jsx .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-jsx .token.tag .token.class-name {
              color: #005cc5;
            }

            .language-jsx .token.tag .token.script-punctuation,
            .language-jsx .token.attr-value .token.punctuation:first-child {
              color: #d73a49;
            }

            .language-jsx .token.attr-value {
              color: #032f62;
            }

            .language-jsx span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .token.tag .token.punctuation {
              color: #24292e;
            }

            .language-html .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-html .token.tag .token.attr-value,
            .language-html
              .token.tag
              .token.attr-value
              .token.punctuation:not(:first-child) {
              color: #032f62;
            }

            /* CSS */
            .language-css .token.selector {
              color: #6f42c1;
            }

            .language-css .token.property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );
}