import { Router, Request, Response } from 'express';

const router: Router = Router();

// Ana sayfa route'u: main.ejs render ediliyor
router.get('/', (req: Request, res: Response) => {
  res.render('main');
});

export default router;
