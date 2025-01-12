export const formatToNumeric = (value: string): number => {
    const numeric = value.replace(/\D/g, "").replace(/[^0-9]/g, "");
    return parseFloat((parseInt(numeric, 10) / 100).toFixed(2)) || 0;
}

export const formatToCurrency = (value: number): string => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export const formatDateHourToNow = (dateString: Date = new Date()): Date => {
    const date = new Date(dateString)
    const dataAtual = new Date();
  
    date.setHours(dataAtual.getHours());
    date.setMinutes(dataAtual.getMinutes());
    date.setSeconds(dataAtual.getSeconds());
  
    return date;
}