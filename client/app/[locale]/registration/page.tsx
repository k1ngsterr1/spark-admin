import RegistrationForm from "@widgets/Form/RegistrationForm/index";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Create An Account | Spark Admin",
    description: "Registration",
  };
}

const RegistrationPage = () => {
  return (
    <>
      <RegistrationForm />
    </>
  );
};

export default RegistrationPage;
