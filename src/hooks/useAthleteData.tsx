import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENV } from '../constants';

const useAthleteData = (firebaseId: string) => {
  const [athlete, setAthlete] = useState<InterfaceIndividualAthlete | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!firebaseId) {
      setLoading(false);
      setError(true);
      return;
    }
    const fetchAthleteData = async () => {
      try {
        const response = await axios.get(
          `${ENV.API_URL}/public/member/${firebaseId}`
        );
        setAthlete(response.data);
      } catch (err) {
        setError(true);
        console.error('Failed to fetch athlete data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAthleteData();
  }, [firebaseId]);

  return { athlete, loading, error };
};

export default useAthleteData;
