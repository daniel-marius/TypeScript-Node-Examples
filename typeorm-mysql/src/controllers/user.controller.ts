import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entity/User";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await getRepository(User).find();
  return res.json(users);
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const results = await getRepository(User).findOne(id);
  return res.json(results);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;
  const newUser = getRepository(User).create(body);
  const results = await getRepository(User).save(newUser);
  return res.json(results);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { body } = req;
  const user = await getRepository(User).findOne(id);
  if (user) {
    getRepository(User).merge(user, body);
    const results = await getRepository(User).save(user);
    return res.json(results);
  }

  return res.json({ msg: "Not user found" });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const results = await getRepository(User).delete(id);
  return res.json(results);
};
