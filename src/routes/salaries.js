import { Router } from 'express';
import { Salary } from '../models/Salary.js';

/**
 * Creates the routes for /api/salaries.
 *
 * @param {import('../repositories/Ledger.js').Ledger} ledger - Ledger that stores salaries.
 * @returns {Router}
 */
export function salaryRoutes(ledger) {
  const router = Router();

  router.get('/', (req, res) => {
    res.json(ledger.findAll());
  });

  router.get('/:id', (req, res) => {
    const salary = ledger.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: 'Salary not found' });
    }
    res.json(salary);
  });

  router.post('/', (req, res) => {
    const salary = ledger.add(toSalary(req.body));
    res.status(201).json(salary);
  });

  router.put('/:id', (req, res) => {
    const salary = ledger.update(req.params.id, toSalary(req.body));
    if (!salary) {
      return res.status(404).json({ error: 'Salary not found' });
    }
    res.json(salary);
  });

  router.delete('/:id', (req, res) => {
    if (!ledger.delete(req.params.id)) {
      return res.status(404).json({ error: 'Salary not found' });
    }
    res.status(204).end();
  });

  return router;
}

/**
 * Builds a Salary from a request body.
 *
 * @param {object} body
 * @returns {Salary}
 */
function toSalary(body = {}) {
  return new Salary({
    description: body.description,
    amount: Number(body.amount),
    category: body.category,
    date: body.date,
  });
}