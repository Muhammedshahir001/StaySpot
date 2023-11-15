const mongoose = require('mongoose')
const Connection = async () => {
mongoose.set('strictQuery', false)


mongoose.connect(process.env.DATABASE).then(() => {
    console.log('port connected')
})
    .catch((err) => {
        console.log('error' + err)
    })
}
module.exports = Connection;