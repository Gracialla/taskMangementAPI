import * as teamService from '../services/teamService.js';

export const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;
    const team = await teamService.createTeam(name, members || []);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { userId } = req.body;
    const team = await teamService.addMemberToTeam(teamId, userId);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await teamService.getTeamById(req.params.teamId);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
