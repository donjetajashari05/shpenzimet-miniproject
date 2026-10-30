import { Kategoria, Shpenzim } from './shpenzim';

export const KATEGORITE_PROVE: Kategoria[] = [
  { id: 1, emri: 'Ushqim', ngjyra: '#16a34a', numriShpenzimeve: 2 },
  { id: 2, emri: 'Transport', ngjyra: '#2563eb', numriShpenzimeve: 1 },
  { id: 3, emri: 'Qira', ngjyra: '#9333ea', numriShpenzimeve: 1 },
  { id: 4, emri: 'Argëtim', ngjyra: '#ea580c', numriShpenzimeve: 1 },
];

export const SHPENZIMET_PROVE: Shpenzim[] = [
  { id: 1, pershkrimi: 'Kafe', shuma: 1.5, data: '2026-10-27T08:30:00',
    kategoriaId: 1, kategoriaEmri: 'Ushqim', kategoriaNgjyra: '#16a34a' },
  { id: 2, pershkrimi: 'Autobusi', shuma: 0.8, data: '2026-10-26T07:45:00',
    kategoriaId: 2, kategoriaEmri: 'Transport', kategoriaNgjyra: '#2563eb' },
  { id: 3, pershkrimi: 'Qiraja e tetorit', shuma: 250, data: '2026-10-01T10:00:00',
    kategoriaId: 3, kategoriaEmri: 'Qira', kategoriaNgjyra: '#9333ea' },
  { id: 4, pershkrimi: 'Supermarketi', shuma: 34.2, data: '2026-10-25T18:10:00',
    kategoriaId: 1, kategoriaEmri: 'Ushqim', kategoriaNgjyra: '#16a34a' },
  { id: 5, pershkrimi: 'Kinema', shuma: 6, data: '2026-10-24T20:00:00',
    kategoriaId: 4, kategoriaEmri: 'Argëtim', kategoriaNgjyra: '#ea580c' },
];