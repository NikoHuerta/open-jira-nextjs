import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry[] 
    | IEntry


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {


    switch(req.method){
        case 'GET':
            return getEntries( res );
        
        case 'POST':
            return createEntry( req, res );

        // case 'PUT':
        //     return editEntry( req, res );

        // case 'DELETE':
        //     return deleteEntry( req, res );

        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}


const getEntries = async ( res: NextApiResponse<Data> ) => {

    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();

    res.status(200).json( entries );
}

const createEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { description = '' } = req.body; // Obtenemos la descripcion del body
    const newEntry = new Entry({
        description,
        createdAt: Date.now()
    });
    
    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect();

        return  res.status(201).json( newEntry );

    }catch(e){
        await db.disconnect();
        console.log(e);
        return res.status(500).json({ message: 'Server error, review serverSideLogs' });
    }

}


// const editEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
//     const { id } = req.query; // Obtenemos el id de la url
//     const { description } = req.body; // Obtenemos el nuevo valor de la descripcion

//     if(!id || !description) // Si no se envia id o description
//         return res.status(400).json({ message: 'Bad Request' });

//     try {
//         await db.connect();
//         const entry = await Entry.findByIdAndUpdate( id, { description }, { new: true }) as IEntry; // new: true para que retorne el objeto actualizado

//         if(!entry) // Si no se encontro la entrada
//             return res.status(404).json({ message: `Entry id: '${id}' not found` });

//         await db.disconnect();

//         return res.status(200).json( entry );

//     }catch(e){ // Si ocurre un error
//         await db.disconnect();
//         console.log(e);
//         return res.status(500).json({ message: 'Server error, review serverSideLogs' });
//     }

// }

// const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

//     const { id } = req.query; // Obtenemos el id de la url

//     if(!id) // Si no se envia id
//         return res.status(400).json({ message: 'Bad Request' });
    
//     try {
//         await db.connect();
//         const resp =  await Entry.findByIdAndDelete( id );

//         if(!resp) // Si no se encontro la entrada
//             return res.status(404).json({ message: `Entry id: '${id}' not found` });
        
//         await db.disconnect();

//         return res.status(200).json({ message: 'Entry deleted' });

//     } catch(e){ // Si ocurre un error
//         await db.disconnect();
//         console.log(e);
//         return res.status(500).json({ message: 'Server error, review serverSideLogs' });
//     }
// }