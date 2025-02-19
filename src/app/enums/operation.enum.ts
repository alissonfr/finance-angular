export enum Operation {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
    // CREDIT_CARD_EXPENSE = "CREDIT_CARD_EXPENSE",
}

export const OperationLabels = new Map<Operation, string>([
    [Operation.INCOME, "Receita"],
    [Operation.EXPENSE, "Despesa"],
    // [Operation.CREDIT_CARD_EXPENSE, "Despesa no cartão de crédito"],
]);