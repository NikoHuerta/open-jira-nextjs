import mongoose from 'mongoose';

/*
    Database connection
    * 0 = disconnected
    * 1 = connected
    * 2 = connecting
    * 3 = disconnecting
*/

const mongoConnection = {
    isConected: 0,
}

export const connect = async() => {
    if( mongoConnection.isConected ){
        console.log('Already conected to MongoDB');
        return;
    }

    if( mongoose.connections.length > 0 ){
        mongoConnection.isConected = mongoose.connections[0].readyState;

        if(mongoConnection.isConected === 1) {
            console.log('Using existing connection to MongoDB');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGODB_URI || '');
    mongoConnection.isConected = 1;
    console.log('Conected to MongoDB:', process.env.MONGODB_URI);

}

export const disconnect = async() => {

    if( process.env.NODE_ENV === 'development' ) return;

    if( mongoConnection.isConected === 0 ) return;

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}