import Head from "next/head";
import Image from "next/image";
import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { authUser, loading, signout } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!authUser) router.push("/login");
  }, [authUser, loading, router]);

  return (
    <div>
      <Head>
        <title>Habit Tracker App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        {authUser && (
          <div>Congratulations {authUser?.email}! You are logged in.</div>
        )}
        <button onClick={signout}>Sign out</button>
      </main>
    </div>
  );
}
