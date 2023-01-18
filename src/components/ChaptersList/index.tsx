import { IChapter } from "@/@types/selection";
import styles from "@/styles/ChaptersList.module.css";

const ChaptersList = ({
  chapters,
  expanded = false,
  handleCollapse,
}: {
  chapters: IChapter[];
  expanded?: boolean;
  handleCollapse: () => void;
}) => {
  return (
    <div className={expanded ? styles.container : styles.hidden}>
      <div className={styles.header}>
        <>Chapters</>
        <svg
          className={styles.collapseIcon}
          onClick={handleCollapse}
          height="30px"
          width="30px"
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </div>
      <div className={styles.chaptersList}>
        {chapters.map(({ chapterName }, index: number) => (
          <div key={index} className={styles.chapterName}>
            {chapterName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChaptersList;
