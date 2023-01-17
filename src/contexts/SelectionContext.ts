import { SelectionContextType } from "@/@types/contexts/selection";
import { createContext } from "react";

const SelectionContext = createContext<SelectionContextType | null>(null);

export default SelectionContext;
