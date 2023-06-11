"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const users = require('./users.json');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/users', (req, res) => {
    res.status(200).json(users);
});
app.post('/users', (req, res) => {
    if (req.body.name.length >= 3 && req.body.age >= 0) {
        fs.writeFile('users.json', `${JSON.stringify({ "results": [...users.results, req.body] })}`, (err) => {
        });
        res.status(201).json({ message: 'User Created' });
    }
    else {
        throw new Error('Name - min lenght 3 and age > 0 ');
    }
});
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.results[+id];
    if (!user) {
        throw new Error('User isn`t finded');
    }
    else {
        res.status(200).json({ message: 'User updated' });
        users.results[+id] = req.body;
        fs.writeFile('users.json', `${JSON.stringify((users))}`, (err) => {
        });
    }
});
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.results[+id];
    if (!user) {
        throw new Error('Users isn`t finded');
    }
    else {
        res.status(200).json({ message: 'User deleted' });
        users.results.splice(+id, 1);
        fs.writeFile('users.json', `${JSON.stringify((users))}`, (err) => {
        });
    }
});
const port = 4000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
