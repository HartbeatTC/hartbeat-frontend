import axios from 'axios';
import { useState, useEffect } from 'react';
import { ENV } from '../constants';

const useIndividualAthleteData = (category: string) => {
  const [teamData, setTeamData] = useState<IAthlete[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<IAthlete[]>(
          `${ENV.API_URL}/public/team-members/${category}`
        );
        setTeamData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, [category]);

  return { teamData, loading, error };
};

export default useIndividualAthleteData;
