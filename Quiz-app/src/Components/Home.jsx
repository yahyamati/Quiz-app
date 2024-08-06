import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import Block from './Block';
const Home = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/quiz/listCategory'); // Adjust API endpoint as needed
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
    <div className="sm:mx-10 mt-10 text-center ">
    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mx-auto table">
                  Test Your Knowledge
                </h1>
    <p className="mx-auto font-semibold table m-10 md:text-xl text-gray-500">
                  Choose a category and start your quiz journey.
                </p>

      <div class="relative w-fit table mx-auto ">
        <input
          placeholder="Search..."
          class="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
          name="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} 
        />
       <CiSearch className='size-6 absolute top-3 right-3 text-gray-500 cursor-pointer'/>
      </div>

    <div className="flex flex-wrap gap-6 lg:justify-between items-center px-10 justify-center py-6">
    {filteredCategories.map((cat) => (
          <Block key={cat.category} category={cat.category} imgsrc={cat.image} navigate={navigate}/>
      ))}
   
    </div>
    </div>
    

    
    
    </> );
}
 
export default Home;

