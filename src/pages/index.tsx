import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { SelectionChoicesType, SelectionType } from "@/@types/selection";
import Header from "@/components/Header";
import SelectionContext from "@/contexts/SelectionContext";
import ChaptersList from "@/components/ChaptersList";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import metadata from "@/assets/metadata";

const Home = () => {
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
        const data = require(`../assets${chapter}`);
        setMarkdownText(data.default);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMarkdown();
  }, [selection.chapter]);

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      <>
        <div className="print-not-allowed">
          Printing this content is disallowed!
        </div>
        <Head>
          <title>AKTU Exam Preparation</title>
          <meta
            name="description"
            content="Website to help you with AKTU Exam Preparations"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          {selection.chapter ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownText}
            </ReactMarkdown>
          ) : (
            <div className={styles.contentNotSelected}>
              {"Select a chapter to view its contents."}
            </div>
          )}
        </main>
      </>
    </SelectionContext.Provider>
  );
};

export default Home;
