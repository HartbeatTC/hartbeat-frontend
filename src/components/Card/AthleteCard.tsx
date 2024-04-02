import { Link, useLocation } from 'react-router-dom';

interface AthleteCardProps {
  athlete: IAthlete;
  firstName: string;
  lastName: string;
  backgroundImageUrl: string;
}

const AthleteCard = ({
  athlete,
  firstName,
  lastName,
  backgroundImageUrl,
}: AthleteCardProps) => {
  const isDefaultImage = backgroundImageUrl.endsWith('hb_withText.webp');
  const location = useLocation();
  const athleteUrl = `${location.pathname}/${athlete?.user.firebaseId}`;
  console.log('athleteUrl', athleteUrl);
  return (
    <Link
      to={athleteUrl}
      className={`w-full max-w-[240px] sm:w-1/2 md:w-1/3 lg:1/4 h-[240px] relative overflow-hidden rounded-2xl hover:cursor-pointer hover:scale-105 duration-300 ease-in-out ${
        isDefaultImage && 'border-2 border-red-700'
      }`}
    >
      <img
        src={backgroundImageUrl}
        alt={`${firstName} ${lastName}`}
        loading='lazy'
        className='absolute inset-0 w-full h-full object-cover object-center hover:blur-[50px] transition-all duration-300'
      />
      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
        <div className='text-white font-extrabold text-4xl text-center'>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
      </div>
    </Link>
  );
};

export default AthleteCard;
