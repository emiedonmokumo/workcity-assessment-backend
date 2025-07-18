import { Request, Response } from 'express';
import Project from '../models/Project';
import { isValidObjectId } from 'mongoose';

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, client, budget, status } = req.body;

    // Basic validation
    if (!title || !client) {
      return res.status(400).json({ msg: 'Title and client are required' });
    }

    if (!isValidObjectId(client)) {
      return res.status(400).json({ msg: 'Invalid client ID' });
    }

    if (status && !['pending', 'ongoing', 'completed'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    const project = await Project.create({
      title,
      description,
      client,
      budget,
      status,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating project', error: err });
  }
};


export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().populate('client');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching projects', error: err });
  }
};

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const projects = await Project.findById(id).populate('client');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching projects', error: err });
  }
};


export const getProjectsByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    if (!isValidObjectId(clientId)) {
      return res.status(400).json({ msg: 'Invalid client ID' });
    }

    const projects = await Project.find({ client: clientId }).populate('client');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching client projects', error: err });
  }
};


export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    if (updateFields.status && !['pending', 'ongoing', 'completed'].includes(updateFields.status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    const project = await Project.findByIdAndUpdate(id, updateFields, { new: true });

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating project', error: err });
  }
};


export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting project', error: err });
  }
};
