import { describe, it, expect, beforeEach } from 'vitest';
import { Salary } from '../../src/models/Salary.js';

describe('Salary', () => {
  let salary;

  beforeEach(() => {
    salary = new Salary({ id: 'salary-1', amount: 3000, date: '2026-11-01' });
  });

  it('stores the amount and pay date', () => {
    expect(salary.amount).toBe(3000);
    expect(salary.date).toBe('2026-11-01');
  });

  it('rounds the amount to 2 decimal places', () => {
    const roundedSalary = new Salary({ amount: 10.5555, date: '2026-11-01' });

    expect(roundedSalary.amount).toBe(10.56);
  });

  describe('validate()', () => {
    it('returns no errors for a valid salary', () => {
      expect(salary.validate()).toEqual([]);
    });

    it('rejects an amount of zero', () => {
      salary.amount = 0;

      expect(salary.validate()).toEqual(['amount must be a number greater than 0']);
    });

    it('rejects a negative amount', () => {
      salary.amount = -5;

      expect(salary.validate()).toEqual(['amount must be a number greater than 0']);
    });

    it('rejects a pay date in the wrong format', () => {
      salary.date = '2026/11/01';

      expect(salary.validate()).toEqual([
        'date must be a valid date in the format YYYY-MM-DD',
      ]);
    });

    it('rejects a pay date that does not exist', () => {
      salary.date = '2026-02-30';

      expect(salary.validate()).toEqual([
        'date must be a valid date in the format YYYY-MM-DD',
      ]);
    });
  });
});
