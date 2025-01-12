export enum TransactionStatus {
    PAID = "PAID",
    PENDING = "PENDING",
}

export const TransactionStatusLabels = new Map<TransactionStatus, string>([
    [TransactionStatus.PAID, "Pago"],
    [TransactionStatus.PENDING, "Aguardando pagamento"],
]);