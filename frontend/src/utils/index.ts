export function maskCurrency(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{0})$/, "$1.$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, " ");
  return value.replace(".", "");
}
