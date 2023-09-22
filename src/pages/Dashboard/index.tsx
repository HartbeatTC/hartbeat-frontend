import { RootState, useAppSelector } from '../../redux/store';
import { capitalizeFullName } from '../../utils/capitalizeFullName';

const Dashboard = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log({ user });
  return (
    <div>
      <h1>Personal Dashboard for...</h1>
      <p>{user?.email}</p>
      <p>{capitalizeFullName(user?.displayName || '')}</p>
    </div>
  );
};

export default Dashboard;
