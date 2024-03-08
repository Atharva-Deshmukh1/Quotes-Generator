import React, { useState, useEffect } from 'react';

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      setQuote(randomQuote);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    fetchRandomQuote();
  };

  return (
    <>
    <div className='bg-gray-800 min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-center text-3xl text-white font-bold p-8'>Random Quotes Generator</h1>
      <div className='w-[auto] sm:w-[40vw] bg-gray-200 p-8 rounded-lg'>
        <div className='h-3/4 flex justify-center items-center bg-gray-300 rounded-lg'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error fetching quote. Please try again later.</p>
          ) : (
            <p className="text-center font-semibold p-6">{quote.text}</p>
          )}
        </div>
        <div className='flex justify-between items-center mt-4'>
          {quote && (
            <p className='flex gap-1 '>Author: {quote.author.split(",")[0]}</p>
          )}
          <button className='bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-400' onClick={handleRegenerate}>Regenerate</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
