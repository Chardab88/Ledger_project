import { Router } from 'express';

/**
 * Creates the route for /api/summary.
 *
 * @param {import('../services/SummaryService.js').SummaryService} summaryService
 * @returns {Router}
 */
export function summaryRoutes(_summaryService) {
  const router = Router();

  // TODO: Respond with the totals from summaryService.getSummary() (200):
  //       { salary, basic, extra, total, savings }
  router.get('/', (req, res) => {
  res.status(200).json(_summaryService.getSummary());
});

  return router;
}