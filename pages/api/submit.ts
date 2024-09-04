import type { Applicant } from './lib/applicant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { addApplicant } from './lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const response = await addApplicant(data.name, data.phone, data.screener);
      res.status(200).json(response.stmt);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
