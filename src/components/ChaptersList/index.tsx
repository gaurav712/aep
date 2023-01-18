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
          onClick={handleCollapse}
          height="30px"
          width="30px"
          viewBox="0 0 48 48"
          fill="#ffffff"
        >
          <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
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
