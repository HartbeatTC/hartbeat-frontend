import axios from 'axios';
import { useState, useEffect } from 'react';
import { ENV } from '../constants';

const useTeamAthleteData = () => {
  const [teamData, setTeamData] = useState<ITeamData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ITeamData>(
          `${ENV.API_URL}/public/team-members/categorizedByGender`
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
  }, []);

  return { teamData, loading, error };
};

export default useTeamAthleteData;
