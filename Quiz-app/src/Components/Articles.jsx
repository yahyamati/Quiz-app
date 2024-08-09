import axios from 'axios';
import { useEffect, useState } from 'react';
import BlockArticle from './BlockArticle';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
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

  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.category2]) {
      acc[article.category2] = [];
    }
    acc[article.category2].push(article);
    return acc;
  }, {});

  const uniqueCategories = Object.keys(groupedArticles);

  return (
    <>
    <div className="table mx-auto mt-6">
                        <Link
                            to="/"
                            className="flex items-center gap-1 justify-center w-fit cursor-pointer text-gray-600 hover:underline underline-offset-2 "
                        >
                            <IoArrowBackOutline className="size-5" />
                            <span className="font-semibold">Go back to Home Page</span>
                        </Link>
                    </div>
      <div className="flex flex-wrap gap-6 lg:justify-evenly items-center px-10 justify-center py-6">
      {uniqueCategories.map((category) => (
        <BlockArticle
          key={category}
          category={category}
          articles={groupedArticles[category]} // Pass the articles for this category
          navigate={navigate}
        />
      ))}
    </div>
    </>
  );
}

export default Articles;
