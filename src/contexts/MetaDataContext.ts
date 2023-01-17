import { createContext } from "react";
import { MetaDataContextType } from "../@types/contexts/metadata";

const MetaDataContext = createContext<MetaDataContextType | null>(null);

export default MetaDataContext;
