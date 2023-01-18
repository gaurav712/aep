import { IChapter } from "@/@types/selection";
import SelectionContext from "@/contexts/SelectionContext";
import styles from "@/styles/ChaptersList.module.css";
import { useContext } from "react";

const ChaptersList = ({
  chapters,
  expanded = false,
  handleCollapse,
}: {
  chapters: IChapter[];
  expanded?: boolean;
  handleCollapse: () => void;
}) => {
  const selectionContext = useContext(SelectionContext);

  const handleChapterClicked = (chapter: string) => {
    selectionContext?.setSelection({ ...selectionContext.selection, chapter });
    handleCollapse();
  };

  return (
    <>
      <div
        className={
          expanded ? styles.container : `${styles.hidden} ${styles.container}`
        }
      >
        <div className={styles.header}>
          <>Chapters</>
          <svg
            className={styles.collapseIcon}
            onClick={handleCollapse}
            height="30px"
            width="30px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
        <div className={styles.chaptersList}>
          {chapters.map(({ chapterName }, index: number) => (
            <div
              key={index}
              className={styles.chapterName}
              onClick={() => handleChapterClicked(chapterName)}
            >
              <div className={styles.chapterNum}>{`${index + 1}.`}</div>
              <div>{chapterName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={expanded ? styles.overlay : styles.invisible} />
    </>
  );
};

export default ChaptersList;
