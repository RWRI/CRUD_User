import { v4 as uuidv4} from 'uuid';
import { User } from "../user";
import { request, response } from 'express';

const users : User[] = [
    {
        "id": "1e6da728-865c-4bbb-8f90-9370fc738e8a",
        "email": "a@gmail.com",
        "user": "Ryan",
        "password": "haha"
    },
    {
		"id": "bc01c12a-382e-4b10-a52e-e18b82c7f666",
		"email": "b@gmail.com",
		"user": "teste",
		"password": "muitoforte"
	},
];

function _confereEmail(emailTeste : string): boolean{
    const index : number = users.map(user => user.email).indexOf(emailTeste);
    return (index !== -1);
} 

export function getUsers(req: request, res: response) : boolean{
    return res.status(200).json(users);
}

export function postUser(req: request, res: response): boolean{
    const usuario: User = req.body;
    if(!usuario.email || !usuario.user || !usuario.password)
        return res.status(400).send("Pametros inválidos");

    if(_confereEmail(usuario.email))
        return res.status(400).send("Email já cadastrado no banco");

    usuario.id = uuidv4();
    users.push(usuario);
    return res.status(201).send(users);
}

export function putUser(req: request, res: response) : boolean{
    const idPut : string = req.params.id;
    const pos : number = users.map(user => user.id).indexOf(idPut);
    if(pos === -1)
        return res.status(404).send("Usuário não cadastrado");

    const usuario : Omit<User,"id"> = req.body;
    if(!usuario.email && !usuario.user && !usuario.password)
        return res.status(400).send("Pametros ausentes");  

    if(usuario.email){
        if(_confereEmail(usuario.email))
            return res.status(400).send("Email já cadastrado no banco");   
        users[pos].email = usuario.email;
    }
    
    if(usuario.user)     users[pos].user = usuario.user;
    if(usuario.password) users[pos].password = usuario.password;
    
    return res.status(204).send();
    
}

export function deleteUser(req: request, res: response) : boolean{
    const idDelete: string = req.params.id;
    const pos: number = users.map(user => user.id).indexOf(idDelete);
    if(pos === -1)
        return res.status(404).send("Usuário não cadastrado");
    
    users.splice(pos,1);
    return res.status(204).send();

}