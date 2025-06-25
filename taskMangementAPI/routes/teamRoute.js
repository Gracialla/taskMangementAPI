import { Router } from 'express';
import protectedAction from '../middleware/protected.js';
import * as teamController from '../controllers/teamController.js';

const router = Router();

router.post('/', auth, teamController.createTeam);           // Create a team
router.put('/:teamId/add-member', auth, teamController.addMember); // Add member
router.get('/:teamId', auth, teamController.getTeamById);    // Get team by ID
router.get('/', auth, teamController.getAllTeams);           // List all teams

export default router;
