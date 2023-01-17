import { SelectionChoicesType } from "@/@types/selection";
import SelectionContext from "@/contexts/SelectionContext";
import styles from "@/styles/Header.module.css";
import { ChangeEvent } from "react";

const Header = ({
  branches,
  academicYears,
  subjects,
}: SelectionChoicesType) => {
  return (
    <SelectionContext.Consumer>
      {(selectionContext) => (
        <div className={styles.container}>
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              selectionContext?.setSelection({
                ...selectionContext.selection,
                branch: event.target.value,
              });
            }}
          >
            {branches.map((branch) => (
              <option>{branch}</option>
            ))}
          </select>
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              selectionContext?.setSelection({
                ...selectionContext.selection,
                year: event.target.value,
              });
            }}
          >
            {academicYears.map((academicYear) => (
              <option>{academicYear}</option>
            ))}
          </select>
          <select>
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
