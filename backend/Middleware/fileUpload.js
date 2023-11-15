const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'public/certificate/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })
console.log("Active  resort certificate")
module.exports = {
    upload
}