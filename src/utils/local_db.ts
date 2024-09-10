import { IPaper } from '@/interfaces/paper'

const papersHeaders = [
  {
    align: 'start',
    sortable: false,
    key: 'status',
    title: 'Status',

  },
  { key: 'name', title: 'Nome do Pejeto' },
  { key: 'teamRep', title: 'Representante da Equipe' },
  { key: 'area', title: 'Área' },
  { key: 'crossCuttingThemes', title: 'Tema Transversal' },
  { key: 'ods', title: 'ODS' },
]

const papers: IPaper[] = [
  {
    id: '1',
    name: 'Frozen Yogurt',
    area: 'Informática',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    abstract: 'Frozen Yogurt Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    status: 'Aprovado',
  },
  {
    id: '2',
    name: 'Ice cream sandwich',
    area: 'Agropecuária',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    abstract: 'Lorem Ice cream sandwich ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    status: 'Reprovado',
  },
  {
    id: '3',
    name: 'Eclair',
    area: 'Quimíca',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    status: 'Pendente',
    abstract: 'adf',
  },
  {
    id: '4',
    name: 'Cupcake',
    area: 'Agropecuária',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    abstract: 'Lorem Eclair ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    status: 'Pendente',
  },
  {
    id: '5',
    name: 'Eclair 2',
    area: 'Quimíca',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    abstract: 'Eclair 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    status: 'Pendente',
  },
]

const recivedPapers: IPaper[] = [
  {
    id: '1',
    name: 'Frozen Yogurt',
    area: 'Informática',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    abstract: 'Frozen Yogurt Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    status: 'Falta Avaliadores',
    aproved: true,
    aprovedBy: 'Fábio Longo',
    aprovedDate: '2024-10-06',
  },
  {
    id: '2',
    name: 'Ice cream sandwich',
    area: 'Agropecuária',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    abstract: 'Lorem Ice cream sandwich ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    status: 'Falta Avaliadores',
    aproved: true,
    aprovedBy: 'Fábio Longo',
    aprovedDate: '2024-10-06',
  },
  {
    id: '3',
    name: 'Eclair',
    area: 'Quimíca',
    teamRep: 'Fábio Longo',
    crossCuttingThemes: 'Tema Transversal',
    ods: 'ODS',
    status: 'Falta Avaliadores',
    aproved: true,
    aprovedBy: 'Fábio Longo',
    aprovedDate: '2024-10-06',
    abstract: 'sadfasdf',
  },
]

const recivedpapersHeaders = [
  {
    align: 'start',
    sortable: false,
    key: 'status',
    title: 'Status',

  },
  { key: 'name', title: 'Nome do Pejeto' },
  { key: 'teamRep', title: 'Representante da Equipe' },
  { key: 'area', title: 'Área' },
  { key: 'crossCuttingThemes', title: 'Tema Transversal' },
  { key: 'ods', title: 'ODS' },
  { key: 'aprovedBy', title: 'Aprovado por' },
  { key: 'aprovedDate', title: 'Data de Aprovação' },
]

export {
  papers,
  papersHeaders,
  recivedPapers,
  recivedpapersHeaders,
}
