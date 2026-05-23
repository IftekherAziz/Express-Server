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

const initDB = async () => {
    try {
         await pool.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(20) NOT NULL UNIQUE,
                password VARCHAR(20) NOT NULL,
                is_Active BOOLEAN DEFAULT true,
                age INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        )
        
        console.log('Database initialized successfully')
    } catch (err) {
        console.error('Error connecting to the database:', err)
    }
}

initDB()

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