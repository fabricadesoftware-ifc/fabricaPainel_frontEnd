import { ref } from "vue";

      
export const usersData = ref([
    { userType: 'STUDENT',
    fields: [{ name: "Perfil", link: "url" },
      { name: "Edição", link: "url" },
       { name: "Propostas", link: "url" },
      { name: "Regulamentação", link: "url" }],
  },
   { userType: 'EVALUATOR',
    fields: [{ name: "Perfil", link: "url" },
      { name: "Edição", link: "url" },
       { name: "Propostas", link: "url" },
      { name: "Regulamentação", link: "url" }],
  },
   { userType: 'ADVISOR',
    fields: [{ name: "Perfil", link: "url" },
      { name: "Edição", link: "url" },
       { name: "Propostas", link: "url" },
      { name: "Regulamentação", link: "url" }],
  },
  { userType: 'COLLABORATOR',
    fields: [{ name: "Perfil", link: "url" },
      { name: "Edição", link: "url" },
       { name: "Propostas", link: "url" },
      { name: "Regulamentação", link: "url" }],
  },
  { userType: 'TAE',
    fields: [{ name: "Perfil", link: "url" },
      { name: "Edição", link: "url" },
       { name: "Propostas", link: "url" },
      { name: "Regulamentação", link: "url" }],
  },
   { userType: 'ORGANIZER',
    fields: [{ name: "Perfil", link: "url" },
      { name: "Edição", link: "url" },
       { name: "Propostas", link: "url" },
      { name: "Regulamentação", link: "url" }],
  },
]);

export const returnUserData = (store:any) => {
  if (store.user.is_advisor) {
    return usersData.value.find((s) => s.userType == 'ADVISOR')?.fields
  } else if (store.user.is_collaborator) {
     return usersData.value.find((s) => s.userType == 'COLLABORATOR')?.fields
  } else if (store.user.user_type == 'ADMIN') {
    return usersData.value.find((s) => s.userType == 'ORGANIZER')?.fields
  } else if (store.user.user_type == 'TAE') {
    return usersData.value.find((s) => s.userType == 'TAE')
  } else if (store.user.is_evaluator) {
    return usersData.value.find((s) => s.userType == 'EVALUATOR')
  } else {
     return usersData.value.find((s) => s.userType == 'STUDENT')?.fields
  }


}