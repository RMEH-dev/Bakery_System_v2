import axios from 'axios';
import { useState, useEffect } from 'react';

export function useFetchProfile(profileId, url){
    const [profileData, setProfileData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(url);
          setProfileData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [url]); // dependency array - refetches on URL change
  
    return { profileData, isLoading, error };
  }