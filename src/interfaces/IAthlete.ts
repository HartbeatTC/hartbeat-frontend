enum BoardMemberRole {
  PRESIDENT = 'president',
  VICE_PRESIDENT = 'vice-president',
  SECRETARY = 'secretary',
  TREASURER = 'treasurer',
  MEMBER_AT_LARGE = 'member-at-large',
}

enum AthleteGender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
}

interface IAthlete {
  firstName: string;
  lastName: string;
  gender: AthleteGender; // Adjust based on your data
  division: string; // Adjust as needed, or use an enum if you have predefined divisions
  backgroundImageUrl?: string;
  user: IUser;
}

interface IUser {
  firebaseId: string;
  isBoardMember: boolean;
  boardMemberRole?: BoardMemberRole;
}

interface ICategorizedAthletes {
  male?: IAthlete[];
  female?: IAthlete[];
  'non-binary'?: IAthlete[];
}

interface ITeamData {
  categorizedAthletes: ICategorizedAthletes;
  maxRows: number;
}
