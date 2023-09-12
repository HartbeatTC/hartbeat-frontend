import { AuthProps } from '../../interfaces/AuthProps';
const AuthForm = ({ name, displayName }: AuthProps) => {
  return (
    <div>
      <h1>AuthForm to {displayName}</h1>
      <form name={name}></form>
    </div>
  );
};

export default AuthForm;
