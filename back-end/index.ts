//Создание структуры приложения

import express from 'express'
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
const PORT = 5000;

app.use(cors())
app.use(express.json())

//Запрос на получение
app.post('/api', async (req, res) => {
    const {email, name} = req.body

    if(!email || !name ) 
    return res.status(400).send('Email and name required fields!')

    try{

        const createdRow = await prisma.waitList.create({
            data: {
                email, name
            },

        })

        res.json(createdRow)

    } catch (error) {
        res.status(400).send({message:error})

    }


    res.json({message: 'Hello World!'})
})

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()
