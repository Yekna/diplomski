import { Spinner } from "@diplomski/components/Spinner";
import { useAuth } from "@diplomski/hooks/useAuth";
import { DEFAULT_FORM_CLASSNAME } from "@diplomski/utils/form";
import { useFormik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { lazy, Suspense } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid")
    .required("Email is required")
    .test("tld", "Email is not valid", (value) =>
      /\.[a-z]{2,}(?=\s|$)/.test(value)
    ),
  password: Yup.string().required("Password is required"),
});

const Input = lazy(() => import("@diplomski/components/Form/Input"));
const Button = lazy(() => import("@diplomski/components/Form/Button"));

export default function Auth() {
  const { user, login } = useAuth();
  const router = useRouter();

  const { values, errors, handleChange, handleSubmit, isValid, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        await login(values.email, values.password);
      },
    });

  if (user) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Spinner />}>
        <form onSubmit={handleSubmit} className={DEFAULT_FORM_CLASSNAME}>
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Email"
          />
          <Input
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Password"
            type="password"
          />
          <Button
            disabled={!isValid || isSubmitting}
            loading={isSubmitting || !!user}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div className="text-white">
            Want to add your own venue to our website?{" "}
            <Link className="font-bold hover:underline" href="/sign-up">
              Sign up
            </Link>
          </div>
        </form>
      </Suspense>
    </>
  );
}
