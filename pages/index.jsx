import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useQuery } from "@apollo/client";
import GET_ALL_USER_HABIT from "../lib/apollo/queries/getHabits";
import Habits from "../components/Habits";
export default function Home() {
  const [user, setUser] = useState(null);
  const { loading, data } = useQuery(
    GET_ALL_USER_HABIT,
    {
      variables: { userID: user.uid, first: 5 },
    },
    {
      fetchPolicy: "no-cache",
    }
  );
  const router = useRouter();
  // const HandleSignout = () => {
  //   signOut(auth)
  //     .then(() => { })
  //     .catch((error) => { });
  // };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
      setUser(user);
      localStorage.setItem("userID", user.uid);
    });
  }, [router, loading, data]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Head>
        <title>Habit Tracker App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        {data &&
          data.habits.map((habit, index) => {
            return (
              <div className=" px-5 py-4" key={index}>
                <Habits habit={habit} />
              </div>
            );
          })}
      </main>
    </div>
  );
}
