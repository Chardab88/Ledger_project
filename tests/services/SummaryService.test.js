import { describe, it, expect } from 'vitest';
import { SummaryService } from '../../src/services/SummaryService.js';
import { Expense } from '../../src/models/Expense.js';
import { Salary } from '../../src/models/Salary.js';

function makeLedger(entries) {
  return { findAll: () => entries };
}

function makeExpense(amount, category) {
  return new Expense({
    description: 'Test expense',
    amount,
    category,
    date: '2026-11-01',
  });
}

function makeSalary(amount) {
  return new Salary({ amount, date: '2026-11-01' });
}

function getSummary(expenses = [], salaries = []) {
  return new SummaryService(makeLedger(expenses), makeLedger(salaries)).getSummary();
}

describe('SummaryService', () => {
  describe('getSummary()', () => {
    it('returns all zeros when there are no expenses or salaries', () => {
      expect(getSummary()).toEqual({
        salary: 0,
        basic: 0,
        extra: 0,
        total: 0,
        savings: 0,
      });
    });

    it('adds up all salaries', () => {
      expect(getSummary([], [makeSalary(3000), makeSalary(500)]).salary).toBe(3500);
    });

    it('adds up basic and extra expenses separately', () => {
      const summary = getSummary([
        makeExpense(1200, 'basic'),
        makeExpense(15, 'extra'),
        makeExpense(50, 'basic'),
      ]);

      expect(summary.basic).toBe(1250);
      expect(summary.extra).toBe(15);
    });

    it('calculates the total of all expenses', () => {
      const summary = getSummary([
        makeExpense(1200, 'basic'),
        makeExpense(15, 'extra'),
      ]);

      expect(summary.total).toBe(1215);
    });

    it('calculates savings as total salary minus total expenses', () => {
      const summary = getSummary(
        [makeExpense(1200, 'basic'), makeExpense(15, 'extra')],
        [makeSalary(3000)],
      );

      expect(summary.savings).toBe(1785);
    });

    it('returns negative savings when expenses are higher than salary', () => {
      const summary = getSummary(
        [makeExpense(1200, 'basic')],
        [makeSalary(1000)],
      );

      expect(summary.savings).toBe(-200);
    });

    it('rounds totals to 2 decimal places', () => {
      const summary = getSummary(
        [makeExpense(0.1, 'basic'), makeExpense(0.2, 'extra')],
        [makeSalary(0.1), makeSalary(0.2)],
      );

      expect(summary).toEqual({
        salary: 0.3,
        basic: 0.1,
        extra: 0.2,
        total: 0.3,
        savings: 0,
      });
    });
  });
});
