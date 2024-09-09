const papersHeaders = [
  {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Nome do Pejeto',
  },
  { key: 'area', title: 'Área' },
  { key: 'teamRep', title: 'Representante da Equipe' },
  { key: 'crossCuttingThemes', title: 'Tema Transversal' },
  { key: 'ods', title: 'ODS' },
  { key: 'status', title: 'Status' },
]

const papers = [
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

export {
  papers,
  papersHeaders,
}
