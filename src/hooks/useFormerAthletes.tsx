import axios from 'axios';
import { useState, useEffect } from 'react';
import { ENV } from '../constants';
import { wait } from '../utils/wait';

const useFormerAthletes = () => {
  const [formerAthletes, setFormerAthletes] = useState<IAthlete[] | null>(null);
  const [formerAthleteLoading, setFormerAthleteLoading] =
    useState<boolean>(true);
  const [formerAthleteError, setFormerAthleteError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeamData = async () => {
      setFormerAthleteLoading(true);
      try {
        await wait(1000);
        const response = await axios.get<IAthlete[]>(
          `${ENV.API_URL}/public/former-members`
        );
        setFormerAthletes(response.data);
        setFormerAthleteLoading(false);
      } catch (error) {
        setFormerAthleteError(true);
      } finally {
        setFormerAthleteLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  return { formerAthletes, formerAthleteLoading, formerAthleteError };
};

export default useFormerAthletes;
