import LoginForm from '../components/LoginComponents/LoginForm';

function Login({ user }) {
  return (
    <div>
      <LoginForm user={user} />
    </div>
  );
}

export default Login;
