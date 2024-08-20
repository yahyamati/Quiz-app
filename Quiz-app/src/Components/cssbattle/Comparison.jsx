const Comparison = ({ targetImage }) => {
    return (
      <div className="flex flex-col items-center w-full p-4">
     
        <img
          src={targetImage}
          alt="Target"
          className="border border-gray-300 rounded max-w-full"
        />
      </div>
    );
  };
  
  export default Comparison;
  