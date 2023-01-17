import { SelectionType } from "../selection";

export type SelectionContextType = {
  selection: SelectionType;
  setSelection: (selection: SelectionType) => void;
};
