export type Media = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
};

export type Medias = Record<string, Media>;
export type MediaMap = Media[];

export type AddMediaPayload = {
  fileName: string;
  file: File;
};

export type UpdateMediaPayload = AddMediaPayload & {
  id: string;
};

export enum MediaFileType {
  IMAGE = "image",
  VIDEO = "video",
  PDF = "pdf",
  DOCUMENT = "document",
  SPREADSHEET = "spreadsheet",
  PRESENTATION = "presentation",
  TEXT = "text",
  OTHER = "other",
}
