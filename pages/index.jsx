import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { useLazyQuery } from "@apollo/client";
import GET_ALL_USER_HABIT from "../lib/apollo/queries/getHabits";
import Habits from "../components/Habits";
import Modal from "../components/NewHabit";
import { useAuthState } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
const TimeAndDate = dynamic(() => import("../components/TimeAndDate"), {
  ssr: false,
});
export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [habitCount, setHabitCount] = useState(10);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const HanldeShowModal = (state) => setShow(state);

  const handleShow = () => setShow(true);
  const [getHabits, { error, data, loading: LoadingQueryResult }] =
    useLazyQuery(
      GET_ALL_USER_HABIT,
      {
        variables: { userID: user?.uid, first: habitCount },
      },
      {
        fetchPolicy: "no-cache",
      }
    );
  useEffect(() => {
    if (user) {
      getHabits();
    }
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center header">
        <div className="form-signin  m-auto pt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Habit Tracker App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container-fluid header py-4">
        <div className="row ">
          <div className="col-md-10">
            <div>
              <p className="h3  text-center text-light">Track Your Progress </p>
            </div>
            <div className="d-flex justify-content-center justify-content-center justify-content-md-end px-5 py-2">
              <button className="btn btn-info " onClick={handleShow}>
                Add Habit
              </button>
            </div>
            {LoadingQueryResult && LoadingQueryResult ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : null}
            {data &&
              data.habits.map((habit, index) => {
                return (
                  <div className=" px-5 py-4" key={index}>
                    <Habits habit={habit} />
                  </div>
                );
              })}
          </div>
          <div className="col-md-2">
            <TimeAndDate />
          </div>
        </div>

        <Modal status={show} HanldeShowModal={HanldeShowModal} />
      </main>
    </div>
  );
}
