import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAthleteData } from '../../hooks';
import { mapAthleteToCategory } from '../../utils/mapAthleteToCategory';
import defaultImage from '../../assets/hb_withText.webp';
import { getFirebaseData } from '../../utils/getFirebaseData';
import { styles } from '../../ui/table';

const IndividualAthleteInfo = () => {
  const { category, firebaseId } = useParams<{
    category?: string;
    firebaseId?: string;
  }>();
  const { athlete, loading, error } = useAthleteData(firebaseId!);
  //   const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log('athlete', athlete);

  useEffect(() => {
    // const fetchProfileImage = async () => {
    //   try {
    //     const url = await getFirebaseData(firebaseId!);
    //     if (url) setProfileImageUrl(url);
    //     else setProfileImageUrl(defaultImage);
    //   } catch (err) {
    //     console.error('Error fetching profile image: ', err);
    //     setProfileImageUrl(defaultImage); // Use default image on error
    //   }
    // };

    if (athlete) {
      const athleteCategory = mapAthleteToCategory(
        athlete.athlete.gender,
        athlete.athlete.division
      );
      if (category !== athleteCategory) {
        navigate(`/team/${athleteCategory}/${firebaseId}`);
      } else {
        // fetchProfileImage();
      }
    } else if (!firebaseId) {
      console.error('Invalid athlete ID.');
      navigate('/team'); // Redirect to the team page or show an error message
    }
  }, [athlete, category, firebaseId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading athlete info.</div>;
  if (!athlete) return <div>Athlete not found.</div>;

  return (
    <section className='flex flex-col sm:flex-row items-center py-4 sm:py-12 w-full h-full'>
      <div className='flex-1 sm:flex-none sm:w-1/2 h-full'>
        <img
          src={defaultImage}
          alt={`${athlete.firstName} ${athlete.lastName} picture`}
          className='h-60 w-full sm:h-auto sm:max-h-[500px] object-contain mx-auto'
        />
      </div>
      <div className='flex-1 flex flex-col h-full items-center text-center'>
        <h1 className='text-6xl font-extrabold p-4'>{`${athlete.firstName} ${athlete.lastName}`}</h1>
        <div className='flex flex-col gap-4 p-4 items-center'>
          <h2 className='text-4xl font-bold'>Teams</h2>
          <ul className='flex flex-col gap-2'>
            {athlete.athlete.teams.map((team) => (
              <li key={team}>{team}</li>
            ))}
          </ul>
          <h2 className='text-4xl font-bold'>Profession</h2>
          <p>{athlete.athlete.profession}</p>
          <h2 className='text-4xl font-bold'>Personal Bests:</h2>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr className={styles.tRow}>
                <th className={styles.tHead}>Distance</th>
                <th className={styles.tHead}>Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(athlete.athlete.prs).map(([distance, time]) => (
                <tr key={distance}>
                  <td className={styles.tD}>
                    <p className={styles.tPar}>{distance}</p>
                  </td>
                  <td className={styles.tD}>
                    <p className={styles.tPar}>{time}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className='text-4xl font-bold'>About</h2>
          <p>{athlete.athlete.about}</p>
        </div>
      </div>
    </section>
  );
};

export default IndividualAthleteInfo;
