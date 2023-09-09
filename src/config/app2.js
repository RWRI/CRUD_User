"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUsers = void 0;
var uuid_1 = require("uuid");
var users = [
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
function _confereEmail(emailTeste) {
    var index = users.map(function (user) { return user.email; }).indexOf(emailTeste);
    return (index !== -1);
}
function getUsers(req, res) {
    return res.status(200).json(users);
}
exports.getUsers = getUsers;
function postUser(req, res) {
    var usuario = req.body;
    if (!usuario.email || !usuario.user || !usuario.password)
        return res.status(400).send("Pametros inválidos");
    if (_confereEmail(usuario.email))
        return res.status(400).send("Email já cadastrado no banco");
    usuario.id = (0, uuid_1.v4)();
    users.push(usuario);
    return res.status(201).send(users);
}
exports.postUser = postUser;
function putUser(req, res) {
    var idPut = req.params.id;
    var pos = users.map(function (user) { return user.id; }).indexOf(idPut);
    if (pos === -1)
        return res.status(404).send("Usuário não cadastrado");
    var usuario = req.body;
    if (!usuario.email && !usuario.user && !usuario.password)
        return res.status(400).send("Pametros ausentes");
    if (usuario.email) {
        if (_confereEmail(usuario.email))
            return res.status(400).send("Email já cadastrado no banco");
        users[pos].email = usuario.email;
    }
    if (usuario.user)
        users[pos].user = usuario.user;
    if (usuario.password)
        users[pos].password = usuario.password;
    return res.status(204).send();
}
exports.putUser = putUser;
function deleteUser(req, res) {
    var idDelete = req.params.id;
    var pos = users.map(function (user) { return user.id; }).indexOf(idDelete);
    if (pos === -1)
        return res.status(404).send("Usuário não cadastrado");
    users.splice(pos, 1);
    return res.status(204).send();
}
exports.deleteUser = deleteUser;
