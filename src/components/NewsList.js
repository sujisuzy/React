import styled from 'styled-components';
import NewsItem from './NewsItem';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

function NewsList({category}){
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const fetchData = async () =>{
      setLoading(true);
      try{
        const query = category === 'all' ? ' ' : `&category=${category}` 
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=5af3d59ab4d8455592a3ad12307a8cca${query}`);
        setArticles(response.data.articles);
      }catch(e){
        console.log(e);
      }
      setLoading(false);
    }
    fetchData();
  },[category]);
  if(loading){
    return <NewsListBlock>대기중</NewsListBlock>
  }
  if(!articles){
    return null;
  }
  return(
    <NewsListBlock>
        {articles.map(article => {
          return <NewsItem key={article.id} article={article}/>
        })}
    </NewsListBlock>
  );
}

export default NewsList;