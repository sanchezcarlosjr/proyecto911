// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/ dbConnect';
import User from '../../models/user';
import UserController from "../../controllers/user";
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  try {
    await UserController.createUser("a361075@uabc.edu.mx", "123");
    const users = await User.find();
    console.log(users);
    res.status(200).json({ data: users } as any);
  } catch (error) {
    res.status(400).json({ "error": (error as any).message} as any);
  }
}
