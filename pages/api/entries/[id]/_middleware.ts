import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware (req: NextRequest, ev: NextFetchEvent) {

    // if( req.page.name === '/api/entries') return NextResponse.next(); // Si ES una peticion a /api/entries, no hacemos nada

    const id = req.page.params?.id || '';
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    // if(!mongoose.isValidObjectId(id))
    if( !checkMongoIDRegExp.test(id) )
        return new Response(JSON.stringify({ message: `Invalid Object id: '${ id }'` }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    
    return NextResponse.next();
}