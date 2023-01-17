import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MetaDataContext from "@/contexts/MetaDataContext";

const Home = () => {
  const [metadata, setMetaData] = useState<string>("");

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const { data } = await axios.get(
          "https://raw.githubusercontent.com/gaurav712/aktu-exam-preparation-repo/main/metadata.json"
        );
        setMetaData(JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <MetaDataContext.Provider value={{ metadata, setMetaData }}>
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
        <main className={styles.container}>{metadata}</main>
      </>
    </MetaDataContext.Provider>
  );
};

export default Home;
