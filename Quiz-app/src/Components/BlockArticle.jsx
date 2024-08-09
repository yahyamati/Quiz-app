import { useState } from 'react';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';

const BlockArticle = ({ category, articles, navigate }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const toggleDescription = (e) => {
    e.stopPropagation();
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div
      className="grid grid-cols-1 gap-4 p-4 border rounded-lg shadow-md cursor-pointer transition-transform ease-in-out w-full md:w-1/4 mx-auto"
      onClick={() => navigate(`/articles/${category}`)}
    >
      <div className="flex justify-between items-center ">
        <p className="uppercase font-bold text-center">{category}</p>
        <div onClick={toggleDescription} className="cursor-pointer">
          {isDescriptionVisible ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
        </div>
      </div>
      {isDescriptionVisible && (
        <div className="grid gap-2 text-slate-600 text-sm">
          {articles.map((article) => (
            <div key={article._id} className="rounded-md p-2 bg-white shadow-sm">
              <p>{article.Description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlockArticle;
