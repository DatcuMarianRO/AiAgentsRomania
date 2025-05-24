import { Request, Response, NextFunction, Router } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import metricsService from '../services/metrics.service';
import { authenticateToken } from '../middleware/auth.middleware';
import { performanceLogger } from '../utils/logger';

class MetricsController {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Adaugă middleware de autentificare pentru toate rutele
    this.router.use(authenticateToken);
    
    // Adaugă performance logging pentru a măsura timpii de răspuns
    this.router.use(performanceLogger('metrics-controller'));
    
    // Rute
    this.router.get('/system', this.getSystemMetrics);
    this.router.get('/user/:userId', this.getUserStats);
    this.router.get('/agents/top', this.getTopAgents);
  }

  /**
   * Obține metrici generale ale sistemului
   * Necesită permisiuni de admin
   */
  getSystemMetrics = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    // Verificare permisiuni admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Acces interzis. Necesită permisiuni de administrator.'
      });
    }
    
    const metrics = await metricsService.getSystemMetrics();
    
    res.json({
      status: 'success',
      data: metrics
    });
  });

  /**
   * Obține statistici pentru un utilizator specific
   * Un utilizator poate vedea doar propriile statistici, adminii pot vedea orice utilizator
   */
  getUserStats = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { userId } = req.params;
    
    // Verificare permisiuni - utilizatorii pot vedea doar propriile statistici
    if (req.user?.role !== 'admin' && req.user?.id !== userId) {
      return res.status(403).json({
        status: 'error',
        message: 'Acces interzis. Puteți vedea doar propriile statistici.'
      });
    }
    
    const stats = await metricsService.getUserUsageStats(userId);
    
    res.json({
      status: 'success',
      data: stats
    });
  });

  /**
   * Obține topul agenților după utilizare
   * Accesibil pentru toți utilizatorii autentificați
   */
  getTopAgents = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Limitează numărul maxim de rezultate la 50
    const safeLimit = Math.min(limit, 50);
    
    const topAgents = await metricsService.getTopAgents(safeLimit);
    
    res.json({
      status: 'success',
      data: topAgents
    });
  });
}

export default new MetricsController().router;