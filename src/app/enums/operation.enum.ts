export enum Operation {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}

export const OperationLabels = new Map<Operation, string>([
    [Operation.INCOME, "Receita"],
    [Operation.EXPENSE, "Despesa"],
]);