import { MoneyEntry } from './MoneyEntry.js';
import { CATEGORIES } from './Category.js';



/**
 * A salary payment: an amount received on a pay date.
 * Has no fields of its own beyond those inherited from MoneyEntry.
 */
export class Salary extends MoneyEntry {
  /**
   * @param {object} fields
   * @param {string} [fields.id]
   * @param {number} fields.amount
   * @param {string} fields.date - YYYY-MM-DD
   */
  constructor({ id, amount, date }) {
    super({ id, amount, date });
  }

  /**
   * Validates the inherited fields, description and category.
   *
   * @returns {string[]} Validation error messages; empty if valid.
   */
 
  
}