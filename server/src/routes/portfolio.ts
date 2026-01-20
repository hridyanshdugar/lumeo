import express from 'express'
import {
  getMyPortfolio,
  updatePortfolio,
  getAllPublicPortfolios,
  updateSubdomain,
  getPortfolioBySubdomain
} from '../controllers/portfolioController.js'
import { authenticateToken } from '../middleware/auth.js'
import { extractSubdomain, SubdomainRequest } from '../middleware/subdomain.js'

const router = express.Router()

router.get('/public', getAllPublicPortfolios)
router.get('/public/subdomain', extractSubdomain, async (req: SubdomainRequest, res, next) => {
  // Get subdomain from query param or from request (extracted by middleware)
  const subdomain = (req.query.subdomain as string) || req.subdomain
  
  if (!subdomain) {
    return res.status(400).json({ error: 'No subdomain provided' })
  }
  
  // Set subdomain on request for controller
  req.subdomain = subdomain
  await getPortfolioBySubdomain(req, res)
})

router.get('/me', authenticateToken, getMyPortfolio)
router.put('/me', authenticateToken, updatePortfolio)
router.put('/me/subdomain', authenticateToken, updateSubdomain)

export default router
