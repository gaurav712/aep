import { SelectionContextType } from "@/@types/contexts/selection";
import { ISelectOption } from "@/@types/selection";
import SelectionContext from "@/contexts/SelectionContext";
import styles from "@/styles/Header.module.css";
import { ChangeEvent, useState } from "react";

const Header = ({
  branches,
  academicYears,
  subjects,
  sidebarExpandHandler = () => {},
}: {
  branches: ISelectOption[];
  academicYears: ISelectOption[];
  subjects: ISelectOption[];
  sidebarExpandHandler?: () => void;
}) => {
  const [headerExpanded, setHeaderExpanded] = useState<boolean>(true);

  const handleBranchChange = (
    branch: string,
    selectionContext: SelectionContextType | null
  ) => {
    selectionContext?.setSelection({
      ...selectionContext.selection,
      branch,
    });
  };

  const handleYearChange = (
    year: string,
    selectionContext: SelectionContextType | null
  ) => {
    selectionContext?.setSelection({
      ...selectionContext.selection,
      year,
    });
  };

  const handleSubjectChange = (
    subject: string,
    selectionContext: SelectionContextType | null
  ) => {
    selectionContext?.setSelection({
      ...selectionContext.selection,
      subject,
    });

    /*
     * Pop the sidebar open when subject selection is changed
     * and hide the header
     */
    sidebarExpandHandler();
    handleCollapse();
  };

  const handleExpand = () => {
    setHeaderExpanded(true);
  };

  const handleCollapse = () => {
    setHeaderExpanded(false);
  };

  return (
    <SelectionContext.Consumer>
      {(selectionContext) => (
        <>
          <div
            className={
              headerExpanded ? styles.hidden : styles.collapedContainer
            }
          >
            <svg
              onClick={sidebarExpandHandler}
              height="20"
              width="20"
              viewBox="0 0 48 48"
              fill="#ffffff"
            >
              <path d="M7.5 36q-.65 0-1.075-.425Q6 35.15 6 34.5q0-.65.425-1.075Q6.85 33 7.5 33h33q.65 0 1.075.425Q42 33.85 42 34.5q0 .65-.425 1.075Q41.15 36 40.5 36Zm0-10.5q-.65 0-1.075-.425Q6 24.65 6 24q0-.65.425-1.075Q6.85 22.5 7.5 22.5h33q.65 0 1.075.425Q42 23.35 42 24q0 .65-.425 1.075-.425.425-1.075.425Zm0-10.5q-.65 0-1.075-.425Q6 14.15 6 13.5q0-.65.425-1.075Q6.85 12 7.5 12h33q.65 0 1.075.425Q42 12.85 42 13.5q0 .65-.425 1.075Q41.15 15 40.5 15Z" />
            </svg>
            <svg
              className={styles.expandIcon}
              onClick={handleExpand}
              height="20px"
              width="20px"
              viewBox="0 0 16 16"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
          <div className={headerExpanded ? styles.container : styles.hidden}>
            <select
              className={styles.selectPicker}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                handleBranchChange(event.target.value, selectionContext)
              }
            >
              {branches.map(({ label, value }, index: number) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              className={styles.selectPicker}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                handleYearChange(event.target.value, selectionContext)
              }
            >
              {academicYears.map(({ label, value }, index: number) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              className={styles.selectPicker}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                handleSubjectChange(event.target.value, selectionContext)
              }
            >
              {subjects.map(({ label, value }, index: number) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <svg
              className={styles.collapseIcon}
              onClick={handleCollapse}
              height="20px"
              width="20px"
              viewBox="0 0 16 16"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
        </>
      )}
    </SelectionContext.Consumer>
  );
};

export default Header;
