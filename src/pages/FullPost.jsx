/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import instance, { baseURL } from "../api";

export const FullPost = () => {
  const [ data, setData ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    instance.get('/posts/' + id, ).then(({data}) => {
      setIsLoading(false);
      setData(data);
    }).catch((err) => {
      console.warn(err)
    })
  }, [])

  if (isLoading) {
    return <Post isLoading={true} isFullPost />
  }

  console.log('data', data);
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${baseURL}${data.imageUrl}` : "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
          <ReactMarkdown children={data.text} />,

      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
