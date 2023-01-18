export type SelectionType = {
  branch: string;
  year: string;
  subject: string;
};

interface ISelectOption {
  label: string;
  value: string;
}

export type SelectionChoicesType = {
  branches: ISelectOption[];
  academicYears: ISelectOption[];
  subjects: ISelectOption[];
};
