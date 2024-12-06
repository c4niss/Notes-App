require('dotenv').config()

const config = require('./config.json')

const connectDB =require('./db/connect.js')

const User = require('./models/user.model')
const Note = require('./models/note.model')

const express = require('express')
const cors = require('cors')
const app = express()

const jwt = require('jsonwebtoken')
const {authentificateToken} = require('./utilities')

app.use(express.json())
app.use(
    cors({
        origin:"*"
    })
)

app.get("/",(req,res)=>{
    res.json({data:'hello world'})
})


app.post('/create-account',async(req,res)=>{
    const {fullname, email,password} = req.body

    if(!fullname){
        return res
          .status(400)
          .json({error:true, message:"fullname is required"})
    }
    if(!email){
        return res.status(400).json({error:true, message:'email is required'})
    }
    if(!password){
        return res.status(400).json({error:true, message:'password is required'})
    }
    const isUser = await User.findOne({email:email})
    if(isUser){
        return res.json({error:true, message:'user already exists'})
    }
    const user = new User({
        fullname,
        email,
        password
    })
    await user.save()

    const accestoken = jwt.sign({user
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'36000m'
    })
    return res.json({
        error:false,
        user,
        accestoken,
        message:'user created successfully'
    })
})

app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(!email){
        return res.status(400).json({message:'email is required'})
    }
    if(!password){
        return res.status(400).json({message:'password is required'})
    }
    const userInfo = await User.findOne({email:email})

    if(!userInfo){
        return res.status(400).json({message:'user not found'})
    }
    if(userInfo.password == password){
        const user = {user:userInfo}
        const accestoken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'36000m'
        })
    
        return res.json({
            error:false,
            message:'user logged in successfully',
            email,
            accestoken
        })
    }
    else{
        return res.status(400).json({error:'true',message:'invalid password'})
    }
})
app.get('/get-user',authentificateToken,async(req,res)=>{
    const {user} = req.user
    try {
        const isUser = await User.findOne({_id:user._id})

    if(!isUser){
        return res.status(404).json({error:true, message:"user not found"})
    }
    return res.status(200).json({
        error:false,
        user:isUser,
        message:"user fetched successfully"
    })
    } catch (error) {
        return res.status(500).json({error:true,message:"internal server error"})
    }
})
app.post('/add-note', authentificateToken, async(req,res)=>{
    const {title, content, tags} = req.body
    const {user} = req.user
    if(!title){
        return res.status(400).json({message:'title is required'})
    }
    if(!content){
        return res.status(400).json({message:'content is required'})
    }
    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        })

        await note.save()
        return res.json({
            error:false,
            note,
            message:"note added successfully"
        })
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
})
app.put('/edit-note/:noteId', authentificateToken,async(req,res)=>{
    const noteId = req.params.noteId
    const {title, content, tags, isPinned} = req.body
    const {user} = req.user
    if(!title && !content && !tags){
        return res.status( 400).json({error:true,message:"no change provided"})
    }
    try {
        const note = await Note.findOne({_id:noteId,userId:user._id})
        if(!note){
            return res.status(404).json({error:true, message:"note not found"})
        }
        if(title) note.title = title
        if(content)  note.content = content
        if(tags) note.tags = tags
        note.isPinned = isPinned

        await note.save()
        return res.status(200).json({
            error:false,
            note,
            message:"note updated successfully"
        })

    } catch (error) {
        return res.status(500).json({error:true,message:"internal server error"})
    }
})
app.get('/get-all-notes', authentificateToken, async(req,res)=>{
    const {user} = req.user
    try {
        const notes = await Note.find({userId:user._id}).sort({isPinned:-1})
        return res.status(200).json({
            error:false,
            notes,
            message:"notes fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({error:true,message:"internal server error"})
    }
})
app.get('/get-note/:noteId',authentificateToken,async(req,res)=>{
    const noteId = req.params.noteId
    const {user} = req.user
    try {
        const note = await Note.findOne({_id:noteId,userId:user._id})
        if(!note){
            return res.status(404).json({error:true, message:"note not found"})
        }
        return res.status(200).json({
            error:false,
            note,
            message:"note fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({error:true,message:"internal server error"})
    }
})
app.delete('/delete-note/:noteId',authentificateToken,async(req,res)=>{
    const noteId = req.params.noteId
    const {user} = req.user
    try {
        const note = await Note.findOneAndDelete({_id:noteId,userId:user._id})
        if(!note){
            return res.status(404).json({error:true, message:"note not found"})
        }
        res.status(200).json({
            error:false,
            note,
            message:"note deleted successfully"
        })
    } catch (error) {
        res.status(500).json({error:true,message:"internal server error"})
    }
})
app.put('/update-note-pinned/:noteId',authentificateToken,async(req,res)=>{
    const noteId = req.params.noteId
    const {isPinned} = req.body
    const {user} = req.user
    
    try {
        const note = await Note.findOne({_id:noteId,userId:user._id})
        if(!note){
            return res.status(404).json({error:true, message:"note not found"})
        }
        note.isPinned = isPinned

        await note.save()
        return res.status(200).json({
            error:false,
            note,
            message:"note updated successfully"
        })

    } catch (error) {
        return res.status(500).json({error:true,message:"internal server error"})
    } 
})
app.get('/search-notes/', authentificateToken, async (req,res)=>{
    const {user} = req.user
    const {query} = req.query

    if(!query){
        return res.status(400).json({
            error:true,
            message:"query is required"
        })
    }
    try {
        const matchingNotes = await Note.find({
            userId:user._id,
            $or:[
                {title:{$regex: new RegExp(query,'i')}},
                {content:{$regex: new RegExp(query,'i')}}
            ],
        })
        return res.json({
            error:false,
            notes:matchingNotes,
            message:"notes fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({error:true,message:"internal server error"})
    }

})
const start = async () => {
    try {
        await connectDB(config.connectionString)
        app.listen(3000,()=>{
            console.log('server started')
        })
    } catch (error) {
        console.log(error)
    }
}
start()