<script setup>
import { useAuth } from "@/stores/auth";
import { showMessage } from "@/utils/toastify";

const authStore = useAuth();
const props = defineProps([
  "label",
  "selectedUsers",
  "userType",
  "rounded",
  "one",
]);
const emits = defineEmits(["addUser", "removeUser"]);

const input = ref()
const inputHeight = ref(0)
const searchQuery = ref("");
const filteredUsers = ref([]);
const noDataMessage = ref(
  `Pesquise por um ${String(props.label).toLowerCase()}...`
);
const focused = ref(false);

function updateSearch(value) {
  if (value == "" || !value) {
    noDataMessage.value = `Pesquise por um ${String(
      props.label
    ).toLowerCase()}...`;
    filteredUsers.value = [];
  } else {
    noDataMessage.value = "Carregando...";
    filteredUsers.value = [];
  }
}

async function searchUsers(search) {
  if (search.length < 3 || typeof search != "string") {
    noDataMessage.value = `Pesquise por um ${String(
      props.label
    ).toLowerCase()}...`;
    filteredUsers.value = [];
  } else {
    try {
      noDataMessage.value = "Carregando...";
      const data = await authStore.searchUsers(search, props.userType);

      filteredUsers.value = data.filter((s) => {
        return !props.selectedUsers.some((st) => st.id == s.id);
      });

      if (filteredUsers.value.length == 0) {
        noDataMessage.value = `Nenhum ${String(
          props.label
        ).toLowerCase()} encontrado`;
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
  if (props.one) {
    searchQuery.value = user.name;
  } else {
    searchQuery.value = "";
    noDataMessage.value = `Pesquise por um ${String(
      props.label
    ).toLowerCase()}...`;
  }
  searchUsers(searchQuery.value);
}

function removeUser(id) {
  emits("removeUser", id);
}

function blurInput() {
  if (searchQuery.value.length > 0 && !props.one) {
    setTimeout(() => {
      focused.value = false;
    }, 500);
  } else if (props.one) {
    setTimeout(() => {
      focused.value = false;
    }, 500);
  } else {
    focused.value = false;
  }
}

onMounted(() => {
  inputHeight.value = input.value?.$el?.clientHeight || 0;
});

onUpdated(() => {
  inputHeight.value = input.value?.$el?.clientHeight || 0;
});

watch(searchQuery, (newValue) => {
  debouncedSearchUsers(newValue);
});
</script>

<template>
  <div class="position-relative">
    <v-text-field
      ref="input"
      v-model="searchQuery"
      :label="props.label"
      :focused="focused"
      :rounded="props.rounded || 'md'"
      :density="props.density || 'default'"
      variant="outlined"
      hide-details="auto"
      required
      @focus="focused = true"
      @blur="blurInput()"
    />

    <v-list
      class="d-flex flex-column ga-2 overflow-y-auto elevation-1 w-100"
      style="max-height: 300px; position: absolute; z-index: 1"
      :style="`top: ${inputHeight}px`"
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
      class="d-flex flex-column ga-2 overflow-y-auto text-center px-2 pb-2 elevation-1 w-100 bg-white"
      style="max-height: 300px; position: absolute; z-index: 1"
      :style="`top: ${inputHeight}px`"
      v-else-if="focused"
    >
      <v-divider></v-divider>
      <p>
        {{ noDataMessage }}
      </p>
    </div>
  </div>
</template>
