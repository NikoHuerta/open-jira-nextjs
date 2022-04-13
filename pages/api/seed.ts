import type { NextApiRequest, NextApiResponse } from 'next'; //nextapi snippet 
import { db, seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    if( process.env.NODE_ENV === 'production' ){
        return  res.status(401).json({ message: 'No se puede crear una semilla en producción' });
    }

    await db.connect();

    await Entry.deleteMany(); //borrar todos los registros de la colección Entry
    await Entry.insertMany( seedData.entries ); //insertar los registros de la semilla
    
    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' });
}