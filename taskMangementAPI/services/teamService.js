import Team from '../models/team.js';

export const createTeam = async (name, members) => {
  const team = new Team({ name, members });
  return await team.save();
};

export const addMemberToTeam = async (teamId, userId) => {
  return await Team.findByIdAndUpdate(
    teamId,
    { $addToSet: { members: userId } }, 
    { new: true }
  ).populate('members', 'name email'); 
};

export const getTeamById = async (teamId) => {
  return await Team.findById(teamId).populate('members', 'name email');
};

export const getAllTeams = async () => {
  return await Team.find().populate('members', 'name email');
};
