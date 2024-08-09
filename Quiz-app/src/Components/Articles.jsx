import axios from 'axios';
import { useEffect, useState } from 'react';
import BlockArticle from './BlockArticle';
import { useNavigate } from 'react-router-dom';

const Articles = ({ url }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/api/articles/get`);
        setArticles(response.data.data);
        console.log("Fetched all articles:", response.data.data);
      } catch (error) {
        console.error("There was an error fetching the articles!", error);
      }
    };

    fetchArticles();
  }, [url]);

  // Filter unique categories
  const uniqueCategories = Array.from(new Set(articles.map(article => article.category2)));

  return (
    <>
      <div className="flex flex-wrap gap-6 lg:justify-between items-center px-10 justify-center py-6">
        {uniqueCategories.map((category) => {
          const article = articles.find(article => article.category2 === category);
          return (
            <BlockArticle
              key={category}
              category={article.category2}
              imgSrc={article.image}
              navigate={navigate}
              url={url}
            />
          );
        })}
      </div>
    </>
  );
}

export default Articles;
