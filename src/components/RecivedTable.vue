<template>
  <h2>
    temporariamente travado
  </h2>
  <!-- <v-autocomplete
    v-model="search"
    chips
    clearable
    :items="['Informática', 'Agropecuária', 'Quimíca']"
    label="Buscar por Área"
    multiple
    prepend-inner-icon="mdi-magnify"
    rounded="xl"
    variant="plain"
  />
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
  >
    <template #item.name="{ item }">
      <v-btn
        class="pa-0 hover"
        color="primary"
        variant="text"
      >
        {{ item.name }}
      </v-btn>
    </template>
    <template #item.status="{ item }">
      <div class="text-end">
        <v-chip
          :color="getColor(item.status)"
        >
          {{ item.status }}
        </v-chip>
      </div>
    </template>
  </v-data-table> -->
</template>
<script setup>
  const headers = [
    {
      align: 'start',
      key: 'name',
      sortable: false,
      title: 'Nome do Pejeto',
    },
    { key: 'area', title: 'Área' },
    { key: 'orientador', title: 'Orientador' },
    { key: 'data_aceitacao', title: 'Data de Aceitação' },
    { key: 'nota', title: 'Nota do trabalho' },
    { key: 'status', title: 'Status' },
  ]
  const desserts = [
    {
      name: 'Frozen Yogurt',
      area: 'Informática',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Pendente',
    },
    {
      name: 'Ice cream sandwich',
      area: 'Informática',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Pendente',
    },
    {
      name: 'Eclair',
      area: 'Informática',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Rejeitado',
    },
    {
      name: 'Cupcake',
      area: 'Agropecuária',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Aprovado',
    },
    {
      name: 'Gingerbread',
      area: 'Agropecuária',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Aprovado',
    },
    {
      name: 'Jelly bean',
      area: 'Agropecuária',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Cancelado',
    },
    {
      name: 'Lollipop',
      area: 'Agropecuária',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Aprovado',
    },
    {
      name: 'Honeycomb',
      area: 'Quimíca',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Aprovado',
    },
    {
      name: 'Donut',
      area: 'Quimíca',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Aprovado',
    },
    {
      name: 'KitKat',
      area: 'Agropecuária',
      orientador: 'Fábio Longo',
      data_aceitacao: '20/02/2004',
      nota: '31/05/2024',
      status: 'Rejeitado',
    },
  ]

  const getColor = name => {
    if (name === 'Rejeitado') return 'red'
    if (name === 'Pendente') return 'blue'
    if (name === 'Aprovado') return 'green'
    if (name === 'Cancelado') return 'grey'
    return 'bg-blue'
  }
  </script>

<style scoped>
.hover:hover {
    cursor: pointer;
    text-decoration: underline;
}

</style>
