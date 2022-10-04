// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/ dbConnect';
import User from '../../models/user';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  try {
    const users = await User.find({});
    res.status(200).json({ data: users } as any);
  } catch (error) {
    res.status(400).json({ error: "Error"} as any);
  }
}
