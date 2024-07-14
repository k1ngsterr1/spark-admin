import LoginForm from "@widgets/Form/LoginForm/index";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Login | Spark Admin",
    description: "Login into your account",
  };
}

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
