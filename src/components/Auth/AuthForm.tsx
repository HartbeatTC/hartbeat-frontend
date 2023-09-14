import { AuthFormProps } from '../../interfaces/AuthFormProps';
const AuthForm = ({ name, displayName }: AuthFormProps) => {
  return (
    <div>
      <h1>AuthForm to {displayName}</h1>
      <form name={name}></form>
    </div>
  );
};

export default AuthForm;
