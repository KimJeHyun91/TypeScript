import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let todos = [

    {id: 1, text: "리액트 공부하기", completed: true},
    {id: 2, text: "타입스크립트 익숙해지기", completed: false},
    {id: 3, text: "익스프레스로 서버 만들기", completed: false}

];

app.get('/api/todos', (req: Request, res: Response) => {

    res.json(todos);

});

app.post('/api/todos', (req: Request, res: Response) => {

    const newTodo = {

        id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
        text: req.body.text,
        completed: false

    };
    todos.push(newTodo);
    res.status(201).json(newTodo);

});

app.patch('/api/todos/:id', (req: Request, res: Response) => {

    const {id} = req.params;
    const id2 = ""+id;
    const todo = todos.find(t => t.id === parseInt(id2));

    if(todo){

        todo.completed = !todo.completed;
        res.json(todo);

    } else {

        res.status(404).send('Todo not found');

    }

});

app.delete('/api/todos/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const id2 = "" + id;
    todos = todos.filter(t => t.id !== parseInt(id2));
    res.status(204).send;

})

app.listen(port, () => {

    console.log(`서버가 http://localhost:${port}에서 실행중 입니다.`);

});

