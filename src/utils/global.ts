export const parseDateValue = (value: string | Date) => {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T00:00:00`);
  }
  return new Date(value);
};

export const formatDate = computed(() => {
  return (dateTime: string | Date) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("pt-BR");
  };
});
