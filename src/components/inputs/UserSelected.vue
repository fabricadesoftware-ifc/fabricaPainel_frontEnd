<script setup>
import { useAuth } from "@/stores/auth";
import { showMessage } from "@/utils/toastify";

const authStore = useAuth();
const props = defineProps(["label", "selectedUsers", "userType", "max"]);
const emits = defineEmits(["addUser", "removeUser"]);

const searchQuery = ref("");
const filteredUsers = ref([]);
const noDataMessage = ref(`Pesquise por um ${String(props.label).toLowerCase()}...`);
const focused = ref(false);

function updateSearch(value) {
  if (value == "" || !value) {
    noDataMessage.value = `Pesquise por um ${String(props.label).toLowerCase()}...`;
    filteredUsers.value = [];
  } else {
    noDataMessage.value = "Carregando...";
    filteredUsers.value = [];
  }
}

async function searchUsers(search) {
  if (search.length < 3 || typeof search != "string") {
    noDataMessage.value = `Pesquise por um ${String(props.label).toLowerCase()}...`;
    filteredUsers.value = [];
  } else {
    try {
      noDataMessage.value = "Carregando...";
      const data = await authStore.searchUsers(search, props.userType);

      filteredUsers.value = data.filter((s) => {
        return !props.selectedUsers.some((st) => st.id == s.id);
      });

      console.log(filteredUsers.value)

      if (filteredUsers.value.length == 0) {
        noDataMessage.value = `Nenhum ${String(props.label).toLowerCase()} encontrado`;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearchUsers = debounce(searchUsers, 1000);

function addUser(user) {
  emits("addUser", user);
  searchQuery.value = "";
  noDataMessage.value = `Pesquise por um ${String(props.label).toLowerCase()}...`;
  searchUsers("");
}

function removeUser(id) {
  emits("removeUser", id);
}

function blurInput() {
  if (searchQuery.value.length > 0) {
    setTimeout(() => {
      focused.value = false;
    }, 500);
  } else {
    focused.value = false;
  }
}

watch(searchQuery, (newValue) => {
  debouncedSearchUsers(newValue);
});
</script>

<template>
  <div class="position-relative" @click.self="console.log('aaa')">
    <v-text-field
      :label="props.label"
      v-model="searchQuery"
      density="comfortable"
      variant="outlined"
      :focused="focused"
      @focus="focused = true"
      @blur="blurInput()"
    />

    <v-list
      class="d-flex flex-column ga-2 overflow-y-auto elevation-1 w-100"
      style="max-height: 300px; position: absolute; top: 50px; z-index: 1"
      v-if="filteredUsers.length > 0 && focused"
    >
      <v-list-item v-for="user in filteredUsers" :key="user.id" class="w-100">
        <v-hover>
          <template #default="{ props, isHovering }">
            <v-list-item
              v-bind="props"
              class="cursor-pointer"
              :class="{ 'bg-grey-lighten-2': isHovering }"
              :subtitle="user.email"
              :title="user.name"
              @click="addUser(user)"
            >
              <template #title="{ title }">
                <p class="text-capitalize font-weight-medium">
                  {{ title.toLowerCase() }}
                </p>
              </template>
            </v-list-item>
          </template>
        </v-hover>
      </v-list-item>
    </v-list>

    <div
      class="d-flex flex-column ga-2 overflow-y-auto text-center px-2 pb-2 elevation-1 w-100"
      style="max-height: 300px; position: absolute; top: 50px; z-index: 1"
      v-else-if="focused"
    >
      <v-divider></v-divider>
      <p>
        {{ noDataMessage }}
      </p>
    </div>
  </div>
</template>
