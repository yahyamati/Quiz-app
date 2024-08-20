import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import Block from './Block';
import { Link } from 'react-router-dom';
import MonacoEditor from './MonacoEditor';

const Home = ({url}) => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get(`${url}/api/quiz/listCategory`); 
            setCategories(response.data.data); // Adjust according to your API response structure
          } catch (error) {
            console.error('There was an error fetching the categories!', error);
          }
        };
    
        fetchCategories();
      }, []);

      const filteredCategories = categories.filter((cat) => {
        
        if (searchTerm === "") {
          return cat;
        } else if (cat.category.toLowerCase().includes(searchTerm.toLowerCase())) {
          return cat;
        }
      });
    return ( 
    <>
    <div className="mx-10 mt-10 text-center ">
      <div className='flex justify-center sm:gap-10 flex-wrap-reverse'>
        <Link to="/articles" className=" cursor-pointer max-w-[300px] mb-6 p-3 bg-gray-700 rounded-full items-center text-indigo-100 leading-none lg:rounded-full inline-flex">
          <span className="font-semibold mr-2 text-left">Read articles here</span>
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="fill-current opacity-75 h-4 w-4"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"></path></svg>
        </Link>
        <Link to="/csschallenges" className=" cursor-pointer max-w-[300px] mb-6 p-2 bg-gray-700 rounded-full items-center text-indigo-100 leading-none lg:rounded-full inline-flex">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
          <span className="font-semibold mr-2 text-left flex-auto">Test Your CSS Skills</span>
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="fill-current opacity-75 h-4 w-4"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"></path></svg>
        </Link> 
      </div>
      


    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mx-auto table">
                  Test Your Knowledge
                </h1>
    <p className="mx-auto font-semibold table m-10 md:text-xl text-gray-500">
                  Choose a category and start your quiz journey.
                </p>

      <div className="relative w-fit table mx-auto ">
        <input
          placeholder="Search..."
          className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
          name="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} 
        />
       <CiSearch className='size-6 absolute top-3 right-3 text-gray-500 cursor-pointer'/>
      </div>

    <div className="flex flex-wrap gap-6 lg:justify-evenly items-center px-10 justify-center py-6">
    {filteredCategories.map((cat) => (
          <Block key={cat.category} category={cat.category} imgsrc={cat.image} navigate={navigate} url={url}/>
      ))}
   
    </div>
    </div>
    
  

    
    </> );
}
 
export default Home;

