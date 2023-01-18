import { SelectionContextType } from "@/@types/contexts/selection";
import { SelectionChoicesType } from "@/@types/selection";
import SelectionContext from "@/contexts/SelectionContext";
import styles from "@/styles/Header.module.css";
import { ChangeEvent } from "react";

const Header = ({
  branches,
  academicYears,
  subjects,
}: SelectionChoicesType) => {
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
    console.log(subject);
  };

  return (
    <SelectionContext.Consumer>
      {(selectionContext) => (
        <div className={styles.container}>
          <select
            className={styles.selectPicker}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              handleBranchChange(event.target.value, selectionContext)
            }
          >
            {branches.map((branch) => (
              <option>{branch}</option>
            ))}
          </select>
          <select
            className={styles.selectPicker}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              handleYearChange(event.target.value, selectionContext)
            }
          >
            {academicYears.map((academicYear) => (
              <option>{academicYear}</option>
            ))}
          </select>
          <select
            className={styles.selectPicker}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              handleSubjectChange(event.target.value, selectionContext)
            }
          >
            {subjects.map((subject) => (
              <option>{subject}</option>
            ))}
          </select>
        </div>
      )}
    </SelectionContext.Consumer>
  );
};

export default Header;
