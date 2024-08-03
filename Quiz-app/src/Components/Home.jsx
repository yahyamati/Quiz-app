import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [categories, setCategories] = useState([]);
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
    return ( 
    <>
    <div className="sm:mx-10 mt-10 text-center ">
    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mx-auto table">
                  Test Your Knowledge
                </h1>
    <p className="mx-auto font-semibold table p-10 md:text-xl text-gray-500">
                  Choose a category and start your quiz journey.
                </p>
    <div className="flex flex-wrap gap-6 lg:justify-between items-center px-10 justify-center py-6">
    {categories.map((cat) => (
          <Block key={cat.category} category={cat.category} imgsrc={cat.image} navigate={navigate}/>
      ))}
   
    </div>
    </div>
    

    
    
    </> );
}
 
export default Home;

export const Block = ({category,imgsrc,navigate }) => {

    return ( 
    <>
    <div 
    onClick={() => {
        console.log(category);
        console.log(imgsrc);
        navigate(`/category/${category}`);
    }}
    className="flex flex-col gap-2 items-center justify-center bg-slate-100 px-16 p-4 rounded-3xl hover:scale-110 cursor-pointer hover:bg-slate-200 transition-transform ease-in-out w-80">
        <img src={`http://localhost:4000/images/${imgsrc}`} alt="category logo" className='w-16' />
        <p className=" uppercase font-semibold">{category}</p>
    </div>
    </> );
}