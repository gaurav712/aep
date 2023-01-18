import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MetaDataContext from "@/contexts/MetaDataContext";
import { SelectionChoicesType, SelectionType } from "@/@types/selection";
import Header from "@/components/Header";
import SelectionContext from "@/contexts/SelectionContext";
import { MetaDataType } from "@/@types/metadata";
import ChaptersList from "@/components/ChaptersList";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Home = () => {
  const [metadata, setMetaData] = useState<MetaDataType>({});
  const [selectionChoices, setSelectionChoices] =
    useState<SelectionChoicesType>({
      branches: [{ label: "Select your branch", value: "" }],
      academicYears: [{ label: "Select the academic year", value: "" }],
      subjects: [{ label: "Choose the subject", value: "" }],
      chapters: [],
    });
  const [selection, setSelection] = useState<SelectionType>({
    branch: "",
    year: "",
    subject: "",
    chapter: "",
  });
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const [markdownText, setMarkdownText] = useState<string>("");

  const handleSidebarExpand = () => {
    setSidebarExpanded(true);
  };

  const handleSidebarCollapse = () => {
    setSidebarExpanded(false);
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const { data } = await axios.get(
          "https://raw.githubusercontent.com/gaurav712/aktu-exam-preparation-repo/main/metadata.json"
        );
        setMetaData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMetadata();
  }, []);

  /* Get branches */
  useEffect(() => {
    if (metadata)
      setSelectionChoices({
        ...selectionChoices,
        branches: [
          { label: "Select your branch", value: "" },
          ...Object.keys(metadata).map((branch: string) => {
            return {
              value: branch,
              label: branch,
            };
          }),
        ],
      });
  }, [metadata]);

  /* get academic years on branch update */
  useEffect(() => {
    if (selection.branch && metadata[selection.branch]) {
      setSelectionChoices({
        ...selectionChoices,
        academicYears: [
          { label: "Select the academic year", value: "" },
          ...Object.keys(metadata[selection.branch]).map(
            (academicYear: string) => {
              return {
                value: academicYear,
                label: academicYear,
              };
            }
          ),
        ],
      });
    }
  }, [selection.branch]);

  /* get subjects on academic year update */
  useEffect(() => {
    if (selection.year && metadata[selection.branch][selection.year]) {
      setSelectionChoices({
        ...selectionChoices,
        subjects: [
          { label: "Choose the subject", value: "" },
          ...Object.keys(metadata[selection.branch][selection.year]).map(
            (subject: string) => {
              return {
                value: subject,
                label: subject,
              };
            }
          ),
        ],
      });
    }
  }, [selection.year]);

  /* Get chapters list when subject selection is changed */
  useEffect(() => {
    if (selection.subject) {
      const chapters = Object.keys(
        metadata[selection.branch][selection.year][selection.subject]
      );
      setSelectionChoices({
        ...selectionChoices,
        chapters: chapters.map((chapterName: string) => {
          return {
            chapterName,
            contentUri:
              metadata[selection.branch][selection.year][selection.subject][
                chapterName
              ],
          };
        }),
      });
    }
  }, [selection.subject]);

  /* Update the markdown when chapter is changed */
  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const chapter =
          metadata[selection.branch][selection.year][selection.subject][
            selection.chapter
          ];
        if (chapter) {
          console.log(chapter);
          const { data } = await axios.get(
            `https://raw.githubusercontent.com/gaurav712/aktu-exam-preparation-repo/main/${chapter}`
          );
          setMarkdownText(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarkdown();
  }, [selection.chapter]);

  return (
    <MetaDataContext.Provider value={{ metadata, setMetaData }}>
      <SelectionContext.Provider value={{ selection, setSelection }}>
        <>
          <Head>
            <title>AKTU Exam Preparation</title>
            <meta
              name="description"
              content="Website to help you with AKTU Exam Preparations"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header
            {...selectionChoices}
            sidebarExpandHandler={handleSidebarExpand}
          />
          <ChaptersList
            chapters={selectionChoices.chapters}
            expanded={sidebarExpanded}
            handleCollapse={handleSidebarCollapse}
          />
          <main className={styles.container}>
            <ReactMarkdown
              children={markdownText}
              remarkPlugins={[remarkGfm]}
            />
          </main>
        </>
      </SelectionContext.Provider>
    </MetaDataContext.Provider>
  );
};

export default Home;
