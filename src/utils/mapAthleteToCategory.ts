export const mapAthleteToCategory = (
  gender: AthleteGender,
  division: AthleteDivision
) => {
  if (division === 'masters') {
    return 'masters';
  }

  const genderToCategoryMap = {
    male: 'men',
    female: 'women',
    'non-binary': 'non-binary',
  };

  return genderToCategoryMap[gender] || '';
};
