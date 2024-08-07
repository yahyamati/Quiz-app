import axios from 'axios';
import { useEffect, useState } from 'react';
import BlockArticle from './BlockArticle';
const Articles = ({url}) => {
    const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/api/articles/get`);
        setArticles(response.data.data); // Adjust this based on your response structure
        console.log("Fetched all articles:", response.data.data); // Log fetched articles
      } catch (error) {
        console.error("There was an error fetching the articles!", error);
      }
    };

    fetchArticles();
  }, [url]);

    return ( <>
        <div className="flex flex-wrap gap-6 lg:justify-between items-center px-10 justify-center py-6">

    {
        articles.map((article) => (
            <BlockArticle key={article._id} category={article.category2} imgSrc={article.image} url={url} />
        ))
    }
    </div>
    
    </> );
}
 
export default Articles;