<template>
  <LayoutDefault>
    <MainBanner :btnvisible="false" :class="'border-0'" :text="'Todas as edições'" />
    <EditionsView :ano="ano" :categoria="categoria" :editions="editions" />
  </LayoutDefault>
</template>

<script lang="ts" setup>
  interface Edition {
    id: number;
    year: string;
    edition_name: string;
    text: string;
    to: string;
    status: boolean;
  }
  interface Ano {
    year: Number;
  }
  interface Categoria {
    id: number;
    category: string;
  }

  const ano: Ano[] = [
    {
      year: 2012,
    },
    {
      year: 2013,
    },
    {
      year: 2014,
    },
    {
      year: 2015,
    },
    {
      year: 2016,
    },
    {
      year: 2017,
    },
    {
      year: 2018,
    },
    {
      year: 2019,
    },
    {
      year: 2020,
    },
    {
      year: 2021,
    },
    {
      year: 2022,
    },
    {
      year: 2023,
    },
    {
      year: 2024,
    },

  ]
  const categoria: Categoria[] = [
    {
      id: 1,
      category: 'Tecnologia',
    },
    {
      id: 2,
      category: 'Saúde',
    },
    {
      id: 3,
      category: 'Negócios',
    },
    {
      id: 4,
      category: 'Educação',
    },
    {
      id: 5,
      category: 'Meio Ambiente',
    },
    {
      id: 6,
      category: 'Cultura',
    },
    {
      id: 7,
      category: 'Esportes',
    },
    {
      id: 8,
      category: 'Moda',
    },
    {
      id: 9,
      category: 'Gastronomia',
    },
    {
      id: 10,
      category: 'Arte',
    },
    {
      id: 11,
      category: 'Música',
    },
    {
      id: 12,
      category: 'Cinema',
    },
  ]
  const editions: Edition[] = [
    {
      id: 1,
      year: '2024',
      edition_name: 'Edição 2024',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: true,
    },
    {
      id: 2,
      year: '2023',
      edition_name: 'Edição 2023',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 3,
      year: '2022',
      edition_name: 'Edição 2022',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 4,
      year: '2021',
      edition_name: 'Edição 2021',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 5,
      year: '2020',
      edition_name: 'Edição 2020',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 6,
      year: '2019',
      edition_name: 'Edição 2019',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 7,
      year: '2018',
      edition_name: 'Edição 2018',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 8,
      year: '2017',
      edition_name: 'Edição 2017',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 9,
      year: '2016',
      edition_name: 'Edição 2016',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 10,
      year: '2015',
      edition_name: 'Edição 2015',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 11,
      year: '2014',
      edition_name: 'Edição 2014',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 12,
      year: '2013',
      edition_name: 'Edição 2013',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
    {
      id: 13,
      year: '2012',
      edition_name: 'Edição 2012',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non.',
      to: '/',
      status: false,
    },
  ]
</script>
