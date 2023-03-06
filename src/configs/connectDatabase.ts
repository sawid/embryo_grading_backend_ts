const mongoose = require('mongoose')

export const connectDatabase = async () => {
        try {
                await mongoose.connect(process.env.DATABASE)
                console.log('Connected to ' + process.env.DATABASE)
        } catch (err) {
                console.log(err)
                process.exit(1)
        }
}