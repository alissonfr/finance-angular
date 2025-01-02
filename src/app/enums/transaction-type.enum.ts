export enum TransactionType {
    RECURRENT = "RECURRENT",
    SINGLE = "SINGLE",
    IN_INSTALLMENTS = "IN_INSTALLMENTS"
}

export const TransactionTypeLabels = new Map<TransactionType, string>([
    [TransactionType.RECURRENT, "Recorrente"],
    [TransactionType.SINGLE, "Única"],
    [TransactionType.IN_INSTALLMENTS, "Parcelada"]
]);