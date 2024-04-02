import { useIndividualAthleteData } from '../../hooks';
import { AthleteCard } from '../../components';
import defaultImage from '../../assets/hb_withText.webp';

interface AthleteListProps {
  category: 'male' | 'female' | 'non-binary' | 'masters';
}

const AthleteList = ({ category }: AthleteListProps) => {
  const { teamData, loading, error } = useIndividualAthleteData(category);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading athletes</div>;

  return (
    <>
      <h1>{category}</h1>
      <div className='flex justify-center items-center md:max-w-[900px] lg:max-w-[1000px] w-full flex-1'>
        <section className='flex flex-wrap flex-grow gap-4 justify-center align-middle mx-auto w-full px-2'>
          {teamData?.map((athlete, index) => (
            <AthleteCard
              key={index}
              athlete={athlete}
              firstName={athlete.firstName}
              lastName={athlete.lastName}
              backgroundImageUrl={
                athlete?.backgroundImageUrl
                  ? athlete.backgroundImageUrl
                  : defaultImage
              }
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default AthleteList;
