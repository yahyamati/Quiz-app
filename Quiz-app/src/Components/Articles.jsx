import axios from "axios";
import { useEffect, useState } from "react";
import BlockArticle from "./BlockArticle";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Articles = ({ url }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${url}/api/articles/listCategoryArticle`
        );
        setArticles(response.data.data);
        console.log("Fetched all articles:", response.data.data);
      } catch (error) {
        console.error("There was an error fetching the articles!", error);
      }
    };

    fetchArticles();
  }, [url]);

  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.CategoryArticle]) {
      acc[article.CategoryArticle] = [];
    }
    acc[article.CategoryArticle].push(article);
    return acc;
  }, {});

  const uniqueCategories = Object.keys(groupedArticles);

  return (
    <>
      <div className="table mx-auto mt-6">
        <Link
          to="/"
          className="flex items-center gap-1 justify-center w-fit cursor-pointer text-gray-600 hover:underline underline-offset-2"
        >
          <IoArrowBackOutline className="size-5" />
          <span className="font-semibold">Go back to Home Page</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 px-10 py-10 max-w-8xl mx-auto">
        {uniqueCategories.map((category) => (
          <BlockArticle
            key={category}
            category={category}
            articles={groupedArticles[category]}
            navigate={navigate}
          />
        ))}
      </div>
    </>
  );
};

export default Articles;
