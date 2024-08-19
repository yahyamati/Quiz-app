const Comparison = ({ targetImage }) => {
    return (
      <div className="flex flex-col items-center w-full p-4">
        <h3 className="text-lg font-semibold mb-2">Target Image</h3>
        <img
          src={targetImage}
          alt="Target"
          className="border border-gray-300 rounded max-w-full"
        />
      </div>
    );
  };
  
  export default Comparison;
  