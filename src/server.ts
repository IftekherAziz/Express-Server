import express, { type Application, type Request, type Response } from 'express'
import {Pool} from 'pg'

const app: Application = express()
const port = 3000

app.use(express.json()) // Middleware to parse JSON bodies
app.use(express.text()) // Middleware to parse text bodies
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded bodies

// Database connection configuration
const pool = new Pool({
  connectionString:"postgresql://neondb_owner:npg_6IGdWECxQF4n@ep-tiny-block-al69d9sb-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

// Endpoint to handle GET requests
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})  

// Endpoint to handle POST requests
app.post('/', async (req: Request, res: Response) => {
    // console.log(req.body);
    const {name,age} = req.body;
    res.status(201).json({
        message: 'Data received successfully',
        data: {name,age}
    });
});

// Start the server
app.listen(port, () => {
  console.log(`This app is running on port ${port}`)
})