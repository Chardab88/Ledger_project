/**
 * Calculates totals across all expenses and salaries.
 */
export class SummaryService {
  /**
   * @param {import('../repositories/Ledger.js').Ledger} expenses - Ledger of expenses.
   * @param {import('../repositories/Ledger.js').Ledger} salaries - Ledger of salaries.
   */
  constructor(expenses, salaries) {
    this.expenses = expenses;
    this.salaries = salaries;
  }

  /**
   * Returns the summary totals, each rounded to 2 decimal places.
   *
   * @returns {{ salary: number, basic: number, extra: number, total: number, savings: number }}
   */
  getSummary() {
    const sum = (entries) => entries.reduce((total, entry) => total + entry.amount, 0);
    const roundToCents = (amount) =>
      Math.sign(amount) * Math.round((Math.abs(amount) + Number.EPSILON) * 100) / 100;
    const expenses = this.expenses.findAll();
    const salaries = this.salaries.findAll();

    const salary = sum(salaries);
    const basic = sum(expenses.filter((expense) => expense.category === 'basic'));
    const extra = sum(expenses.filter((expense) => expense.category === 'extra'));
    const total = sum(expenses);
    const savings = salary - total;

    return {
      salary: roundToCents(salary),
      basic: roundToCents(basic),
      extra: roundToCents(extra),
      total: roundToCents(total),
      savings: roundToCents(savings),
    };
  }
}