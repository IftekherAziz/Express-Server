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

// Create user api endpoint
app.post('/api/users', async (req: Request, res: Response) => {
    const {name,email,password,age} = req.body;
    try {
        const result = await pool.query(`
        INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *
        `, [name, email, password, age]
    )
    console.log(result);
    res.status(201).json({
        message: 'User created successfully',
        data: result.rows[0]
    });
    } 
    catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error,
        });
    }
});


// Get all users api endpoint
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
        SELECT * FROM users
        `)
        res.status(200).json({
            message: 'Users retrieved successfully',
            data: result.rows
        });
    } 
    catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error,
        });
    }
});

// Get user by id api endpoint Params: id
app.get('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
        SELECT * FROM users WHERE id = $1
        `, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            data: result.rows[0]
        });
    } 
    catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error,
        });
    }
});

// Update user by id api endpoint Params: id
app.put('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, age } = req.body;
    try {
        const result = await pool.query(`
        UPDATE users SET name = $1, email = $2, password = $3, age = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *
        `, [name, email, password, age, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'User updated successfully',
            data: result.rows[0]
        });
    } 
    catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error,
        });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`This app is running on port ${port}`)
})

