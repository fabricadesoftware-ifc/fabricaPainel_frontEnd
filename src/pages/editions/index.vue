<template>
  <LayoutDefault>
    <EditionsView :editions="editions" />
  </LayoutDefault>
</template>

<script lang="ts" setup>
  interface Edition {
    id: number;
    year: string;
    name: string;
    text: string;
    to: string;
    status: boolean;
  }
  const editions: Edition[] = [
    {
      id: 1,
      year: '2024',
      name: 'Edição 2024',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: true,
    },
    {
      id: 2,
      year: '2023',
      name: 'Edição 2023',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 3,
      year: '2022',
      name: 'Edição 2022',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 4,
      year: '2021',
      name: 'Edição 2021',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 5,
      year: '2020',
      name: 'Edição 2020',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 6,
      year: '2019',
      name: 'Edição 2019',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 7,
      year: '2018',
      name: 'Edição 2018',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 8,
      year: '2017',
      name: 'Edição 2017',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 9,
      year: '2016',
      name: 'Edição 2016',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 10,
      year: '2015',
      name: 'Edição 2015',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 11,
      year: '2014',
      name: 'Edição 2014',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 12,
      year: '2013',
      name: 'Edição 2013',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
    {
      id: 13,
      year: '2012',
      name: 'Edição 2012',
      text: 'Semana De Ensino e pesquisa',
      to: '/',
      status: false,
    },
  ]
</script>
