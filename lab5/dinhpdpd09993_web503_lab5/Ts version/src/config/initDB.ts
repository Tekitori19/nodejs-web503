import mongoose from "mongoose"

export default mongoose.connect(process.env!.MONGO_URL || "url", {
    dbName: 'posts'
})
