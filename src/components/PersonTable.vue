<template>
  <v-text-field
    v-model="search"
    class="mt-4"
    clearable
    hide-details
    label="Buscar na tabela"
    prepend-inner-icon="mdi-magnify"
    rounded="xl"
    single-line
    variant="outlined"
  />
  <v-data-table
    :headers="headers"
    :items="people"
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
    <template #item.permission="{ item }">
      <div class="text-start">
        <v-chip
          :color="getColor(item.permission)"
        >
          {{ item.permission }}
        </v-chip>
      </div>
    </template>
    <template #item.actions="{ item }">
      <div class="text-end">
        <v-btn
          color="primary"
          icon
          variant="plain"
        >
          <v-icon>mdi-pencil</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(text, index) in ['Admin', 'Organizador', 'Co-Organizador', 'Avaliador', 'Sem Permissões']"
                :key="index"
                :value="index"
              >
                <v-list-item-title @click="setNewPermission(item.id, text)">{{ text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>
<script setup>
  const search = ref('')

  const headers = [
    { key: 'name', title: 'Nome' },
    { key: 'email', title: 'Email' },
    { key: 'matricula', title: 'Matrícula' },
    { key: 'permission', title: 'Nível de Permissão' },
    { key: 'actions', title: '' },
  ]

  const people = ref([
    { id: '1', name: 'Alice Dol', email: 'alice@example.com', matricula: '123456', permission: 'Admin' },
    { id: '2', name: 'Bob Carol Eve', email: 'bob@example.com', matricula: '654321', permission: 'Organizador' },
    { id: '3', name: 'Dave Dave', email: 'dave@example.com', matricula: '332211', permission: 'Avaliador' },
    { id: '4', name: 'Eve Carol', email: 'eve@example.com', matricula: '445566', permission: 'Sem Permissões' },
    { id: '5', name: 'Carol Dol', email: 'carol@example.com', matricula: '112233', permission: 'Co-Organizador' },
  ])

  const getColor = permission => {
    if (permission === 'Admin') return 'red'
    if (permission === 'Organizador') return 'blue'
    if (permission === 'Co-Organizador') return 'green'
    if (permission === 'Avaliador') return 'purple'
    if (permission === 'Sem Permissões') return 'grey'
    return 'bg-blue'
  }

  const setNewPermission = (id, permission) => {
    console.log('Setting new permission:', id, permission)
    const person = people.value.find(person => person.id === id)
    person.permission = permission
  }
</script>

<style scoped>
.hover:hover {
    cursor: pointer;
    text-decoration: underline;
}

</style>
