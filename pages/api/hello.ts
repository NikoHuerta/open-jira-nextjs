// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: true;
  message: string;
  method: string;
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  
  res.status(200).json({ 
      ok: true,
      message: 'This is the API for the next.js app , John Doe', //John Doe: Juan Perez
      method: req.method || 'No method provided'
  });

}
