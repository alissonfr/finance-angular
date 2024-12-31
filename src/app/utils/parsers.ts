export const formatToNumeric = (value: string): number => {
    const numeric = value.replace(/[^0-9]/g, "");
    return parseFloat((parseInt(numeric, 10) / 100).toFixed(2)) || 0;
}

export const formatToCurrency = (value: number): string => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}