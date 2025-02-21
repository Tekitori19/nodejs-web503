import mongoose from "mongoose";


const DBCon = async () => {
    console.log(process.env.MONGDB_ULR)
    try {
        mongoose.connect(process.env.MONGDB_ULR)
        console.log('MONGODB IS CONNECTED')
    } catch (error) {
        console.log(error)
    }
}

export default DBCon
