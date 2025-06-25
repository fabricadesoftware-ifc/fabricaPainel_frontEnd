import { ref } from "vue";
      
export const usersData = ref([  
      { name: "Edição", link: "/panel/editions", action: 'navigate' },
      { name: "Propostas", link: "/panel/works", action: 'navigate' },
      { name: "Regulamentação", link: "", action: 'download' },
]);

