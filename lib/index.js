"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT;
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
const db = client.db('recipe-app');
const recipe = db.collection('Recipes');
const users = db.collection('Users');
app.listen(PORT, () => console.log('Database listening on port', PORT));
app.get('/', (req, res) => {
    res.json('Here is my API responding');
});
//signup
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const newUser = yield users.insertOne({ firstName: firstName, lastName: lastName, email: email, password: password });
    res.status(201).send(newUser);
}));
//update recipe
app.patch('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cleanId = new mongodb_1.ObjectId(req.params._id);
    const updatedRecipe = yield recipe.findOneAndUpdate({ _id: cleanId }, { $set: req.body });
    res.send(updatedRecipe);
}));
