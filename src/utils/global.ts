export const formatDate = computed(() => {
  return (dateTime: string | Date) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("pt-BR");
  };
});
