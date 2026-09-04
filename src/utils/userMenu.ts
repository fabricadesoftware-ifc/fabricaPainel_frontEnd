import { ref } from "vue";
      
export const usersData = ref([  
      { name: "Edições", link: "/panel/editions", action: 'navigate' },
      { name: "Propostas", link: "/panel/works", action: 'navigate' },
      { name: "Certificados", link: "/panel/certificates", action: 'navigate' },
      { name: "Regimento", link: "", action: 'download' },
]);

