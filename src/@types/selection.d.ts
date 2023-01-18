export interface IChapter {
  chapterName: string;
  contentUri: string;
}

export type SelectionType = {
  branch: string;
  year: string;
  subject: string;
  chapters: IChapter[];
};

export interface ISelectOption {
  label: string;
  value: string;
}

export type SelectionChoicesType = {
  branches: ISelectOption[];
  academicYears: ISelectOption[];
  subjects: ISelectOption[];
};
