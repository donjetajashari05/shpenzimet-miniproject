export interface Shpenzim {
  id: number;
  pershkrimi: string;
  shuma: number;
  data: string; 
  kategoriaId: number;
  kategoriaEmri: string;
  kategoriaNgjyra: string;
}

export interface ShpenzimInput {
  pershkrimi: string;
  shuma: number;
  data?: string | null; 
  kategoriaId: number;
}

export interface Kategoria {
  id: number;
  emri: string;
  ngjyra: string;
  numriShpenzimeve: number;
}