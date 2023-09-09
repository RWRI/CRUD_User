const { v4: uuidv4 } = require('uuid');

const users = [
    {
        "id": "1e6da728-865c-4bbb-8f90-9370fc738e8a",
        "email": "@gmail.com",
        "user": "Ryan",
        "password": "haha"
    },
    {
		"id": "bc01c12a-382e-4b10-a52e-e18b82c7f666",
		"email": "@gmail.com",
		"user": "teste",
		"password": "muitoforte"
	},
];

const getUsers = (req, res) => {
    res.status(200).json(users);
}

const postUser = (req, res) => {
    const { email, user, password } = req.body;
    const novoUsuario = {
        id: uuidv4(),
        email,
        user,
        password
    }
    users.push(novoUsuario);
    res.status(201).send(users);
}

const putUser = (req, res) => {
    const { email, user, password } = req.body;
    const idPut = req.params.id;
    const pos = users.map(user => user.id).indexOf(idPut);
    if(pos == -1){
        res.status(404).send("Usuário não cadastrado");
    }else{
        users[pos].email = email;
        users[pos].user = user;
        users[pos].password = password;
        res.status(204).send();
    }  
}

const deleteUser = (req, res) => {
    const idDelete = req.params.id;
    const pos = users.map(user => user.id).indexOf(idDelete);
    if(pos == -1){
        res.status(404).send("Usuário não cadastrado");
    }else{
        users.splice(pos,1);
        res.status(204).send();
    }  
}

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser,
};