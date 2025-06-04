import express, {Express, Request, Response, NextFunction} from 'express';

const app : Express = express();
const port = 3000;

app.use(express.json());

interface CustomRequest extends Request {
    startTime?: number
}

//middleware -> add startTime property to request
app.use((req: CustomRequest, res: Response, next: NextFunction)=> {
    req.startTime = Date.now();
    next()
});

app.get('/', (req: Request, res: Response) => {
    res.send("Hello. Typescript with express")
});

//post route -> new user -> name, email
interface User {
    name : string,
    email : string
}

app.post('/user', (req: Request<{}, {}, User>, res: Response)=> {
    const {name, email} = req.body;
    res.json({
        message: `User created ${name}-${email}`
    });
});

//users based on id
app.get('/users/:id', (req: Request<{id: string}>, res: Response)=> {
    const {id} = req.params
    res.json({
        userId: id
    });
});

app.listen(port, ()=> {
    console.log(`Server is now running on port ${port}`);
});