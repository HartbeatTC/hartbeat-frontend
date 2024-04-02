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

enum AthleteDivision {
  OPEN = 'open',
  MASTERS = 'masters',
  JUNIOR = 'junior',
  YOUTH = 'youth',
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

interface InterfaceIndividualAthlete {
  firstName: string;
  lastName: string;
  email: string;
  role: BoardMemberRole;
  isBoardMember: boolean;
  athlete: {
    gender: AthleteGender;
    division: AthleteDivision;
    teams: string[];
    profession: string;
    prs: JSON;
    about: string;
    birthday: Date;
  };
}
