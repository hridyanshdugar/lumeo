import express from 'express'
import {
  getMyPortfolio,
  getPublicPortfolio,
  updatePortfolio,
  getAllPublicPortfolios
} from '../controllers/portfolioController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/public', getAllPublicPortfolios)
router.get('/public/:username', getPublicPortfolio)

router.get('/me', authenticateToken, getMyPortfolio)
router.put('/me', authenticateToken, updatePortfolio)

export default router
