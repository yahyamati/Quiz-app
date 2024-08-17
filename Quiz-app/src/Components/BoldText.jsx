const BoldText = ({ text,className }) => {
    if (!text) return null;
  
    const parts = text.split(/('.*?'|<.*?>|“.*?”|‘.*?’|".*?")/);  
    return (
      <p className={`text-gray-700 ${className}`}>
        {parts.map((part, index) =>
           part.match(/'.*?'|<.*?>|“.*?”|‘.*?’|".*?"/) ? (
            // If the part is inside single quotes, make it bold
            <span key={index} className="font-bold">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </p>
    );
  };

export default BoldText;