export type SelectionType = {
  branch: string;
  year: string;
  subject: string;
  chapter: string;
};

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IChapter {
  chapterName: string;
  contentUri: string;
}

export type SelectionChoicesType = {
  branches: ISelectOption[];
  academicYears: ISelectOption[];
  subjects: ISelectOption[];
  chapters: IChapter[];
};
