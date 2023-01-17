import Head from "next/head";
import styles from "@/styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>AKTU Exam Preparation</title>
        <meta
          name="description"
          content="Website to help you with AKTU Exam Preparations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>Hello World</main>
    </>
  );
};

export default Home;
