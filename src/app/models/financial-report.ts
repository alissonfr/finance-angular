

export class FinancialReportDTO {
    totalBalance: BalanceReportDTO;
    expenses: ExpensesDTO;
    income: IncomeDTO;
}

export class BalanceReportDTO {
    current: number;
    percentageChange: number;
}

export class ExpensesDTO {
    paid: number;
    expected: number;
}

export class IncomeDTO {
    received: number;
    expected: number;
}