import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
    | { message: string }
    | IEntry[] 
    | IEntry


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'GET':
            return getEntry( req, res ); // Obtenemos una entrada

        case 'PUT':
            return updateEntry(req, res); // Actualizar una entrada
        
        case 'DELETE':
            return deleteEntry(req, res); // Eliminar una entrada
        
        default:
            return res.status(400).json({ message: `Invalid Endpoint: ${ req.method }` });
    }
}


const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query; // Obtenemos el id de la url

    try {
        await db.connect();
        const entryToUpdate = await Entry.findById( id ); // Buscamos el id en la base de datos

        if(!entryToUpdate){ // Si no se encontro la entrada
            await db.disconnect();
            return res.status(404).json({ message: `Entry id: '${ id }' not found` });
        }

        const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true } );
        await db.disconnect();
        return res.status(200).json( updatedEntry! ); // ! para obviar typescript null, nunca sera null
    
    } catch(error: any){ // Si ocurre un error
        await db.disconnect();
        // return res.status(400).json({ message: JSON.stringify(error) });
        return res.status(400).json({ message: error.errors.status.message });
    }


}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { id } = req.query; // Obtenemos el id de la url
    
    try{
        await db.connect();
        const entry = await Entry.findById( id ); // Buscamos el id en la base de datos
        await db.disconnect();

        if(!entry){ // Si no se encontro la entrada
            return res.status(404).json({ message: `Entry id: '${ id }' not found` });
        }
        return res.status(200).json( entry ); // Retornamos la entrada
        
    } catch (e: any) { // Si ocurre un error
        await db.disconnect();
        return res.status(400).json({ message: JSON.stringify(e) }); // Retornamos el error
    }
}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { id } = req.query;

    try {
        await db.connect();
        const entry = await Entry.findById( id ); // Buscamos el id en la base de datos
        if(!entry){ // Si no se encontro la entrada
            await db.disconnect();
            return res.status(404).json({ message: `Entry id: '${ id }' not found` });
        }

        await Entry.findByIdAndDelete( id ); // Eliminamos la entrada
        await db.disconnect();
        return res.status(200).json({ message: 'Entry deleted' });

    } catch(e: any){ // Si ocurre un error
        await db.disconnect();
        return res.status(400).json({ message: JSON.stringify(e) }); // Retornamos el error
    }
}
