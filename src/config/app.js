const { v4: uuidv4 } = require('uuid');

const users = [
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

const confereEmail = emailTeste => {
    const index = users.map(user => user.email).indexOf(emailTeste);
    return (index !== -1);
}

const getUsers = (req, res) => {
    return res.status(200).json(users);
}

const postUser = (req, res) => {
    const { email, user, password } = req.body;
    if(!email || !user || !password)
        return res.status(400).send("Pametros inválidos");

    if(confereEmail(email))
        return res.status(400).send("Email já cadastrado no banco");

    const novoUsuario = {
        id: uuidv4(),
        email,
        user,
        password
    }
    users.push(novoUsuario);
    return res.status(201).send(users);
}

const putUser = (req, res) => {
    const idPut = req.params.id;
    const pos = users.map(user => user.id).indexOf(idPut);
    if(pos === -1)
        return res.status(404).send("Usuário não cadastrado");

    const { email, user, password } = req.body;
    if(!email && !user && !password)
        return res.status(400).send("Pametros ausentes");  

    if(email){
        if(confereEmail(email))
            return res.status(400).send("Email já cadastrado no banco");   
        users[pos].email = email;
    }
    
    if(user)     users[pos].user = user;
    if(password) users[pos].password = password;
    
    return res.status(204).send();
    
}

const deleteUser = (req, res) => {
    const idDelete = req.params.id;
    const pos = users.map(user => user.id).indexOf(idDelete);
    if(pos === -1)
        return res.status(404).send("Usuário não cadastrado");
    
    users.splice(pos,1);
    return res.status(204).send();

}

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser,
};