import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetchBakeryItems(url) {
  const [bakeryItems, setBakeryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setBakeryItems(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // dependency array - refetches on URL change

  return { bakeryItems, isLoading, error };
}
