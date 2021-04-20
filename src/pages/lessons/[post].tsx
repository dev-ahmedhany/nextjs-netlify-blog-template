import { GetStaticProps, GetStaticPaths } from "next";
import {useEffect} from 'react'
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/lessons";
import fs from "fs";
import yaml from "js-yaml";
import PostLayout from "../../components/LessonLayout";
import RandomTweet from "../../components/RandomTweet";

import YouTube from "react-youtube";

declare global {
  interface Window {
    klipse_settings:any;
  }
}


export type Props = {
  title: string;
  order: number;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: MdxRemote.Source;
};

const components = { YouTube };
const slugToPostContent = (postContents => {
  let hash = {}
  postContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPostContent());

export default function Post({
  title,
  order,
  slug,
  tags,
  author,
  description = "",
  source,
}: Props) {
  const content = hydrate(source, { components })

  useEffect(() => {
    setTimeout(() => {
      if( (document.querySelector(".language-js") || document.querySelector(".language-html") ) &&  !window.klipse_settings)
    {
      // css selector for the html elements you want to klipsify
      window.klipse_settings = new Object({eval_idle_msec: 200,
        selector_eval_js :".language-js",selector_eval_html: ".language-html",
      codemirror_options_in: {
        lineWrapping: true,
        lineNumbers: true
      },
      codemirror_options_out: {
        lineWrapping: true,
        lineNumbers: true
      }}); 
      // idle time in msec before the snippet is evaluated
      const script = document.createElement('script');
      //script.setAttribute('async', ''); // Or defer or nothing
      script.setAttribute('id', "script-klipse-plugin");
      script.setAttribute('src', "/klipse/klipse_plugin.min.js");
      const body = document.querySelector("body"); // Or any other location , example head
      body.appendChild(script);

      const style = document.createElement('link');
      style.setAttribute('rel', "stylesheet");
      style.setAttribute('type', "text/css");
      style.setAttribute('href', "/klipse/codemirror.css");
      const head = document.querySelector("head"); // Or any other location , example head
      head.appendChild(style);
    }
    }, 1000);
  },[])
  
  return (
    <PostLayout
      title={title}
      order={order}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
    >
      {content}
      <RandomTweet/>
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map(it => "/lessons/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  return {
    props: {
      title: data.title,
      order: data.order,
      slug: data.slug,
      description: "",
      tags: data.tags,
      author: data.author,
      source: mdxSource
    },
  };
};

