const express = require('express')
const Post = require('../model/model')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'users')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/posts', upload.single('photu'), async (req, res) => {
    console.log(req.file)
    try {
        let { name, location, description, likes, date } = req.body
        if (name && location && description) {
            let data = await Post.create({ 
                name, 
                location, 
                description, 
                likes, 
                date, 
                PostImage: { 
                    data: fs.readFileSync(path.join(__dirname, '..', 
                    'users/' + req.file.filename)),
                    contentType: 'image/png' 
                }, 
            })

            // console.log('Response:', data)

            return res.status(201).json({ message: 'Post Created', data })
            
        }
        else {
            // console.log('Error : details are missing')
            return res.status(400).json({ message: 'details are missing' })
        }
    }
    catch (err) {
        console.log('Error:', err.message)
        return res.status(400).json({ message: err.message })
    }
})

router.get('/posts', async (req, res) => {
    try {
        let data = await Post.find().sort({ $natural: -1 })
        console.log('Response:', data)
        return res.status(200).json(data)
    }
    catch (err) {
        console.log('Error:',err.message)
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router
