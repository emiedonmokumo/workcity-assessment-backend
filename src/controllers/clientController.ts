import { Request, Response } from 'express';
import Client from '../models/Client';
import { isValidObjectId } from 'mongoose';

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name) {
      return res.status(400).json({ msg: 'Name is required' });
    }

    const client = await Client.create({
      name,
      email,
      phone,
      address,
    });

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating client', error: err });
  }
};

export const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching clients', error: err });
  }
};

export const getClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching clients', error: err });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ msg: 'Invalid client ID' });
    }

    const { name, email, phone, address } = req.body;

    const client = await Client.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating client', error: err });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ msg: 'Invalid client ID' });
    }

    const deleted = await Client.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting client', error: err });
  }
};
