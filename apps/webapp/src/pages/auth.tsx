import { useAuth } from "@diplomski/hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import { lazy, Suspense, useState } from "react";

const Header = lazy(() => import("@diplomski/components/Header"));

export default function Auth() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <Suspense>
        <Header />
      </Suspense>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={() => login(email, password)}>
          Login
        </button>
      </div>
    </>
  );
}