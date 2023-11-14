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
app.listen(PORT, () => console.log('Database listening on port', PORT));
app.get('/', (req, res) => {
    res.json('Here is my API responding');
});
// implement delete route 
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
const db = client.db('recipe-app');
const recipe = db.collection('recipes');
app.delete('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cleanId = new Object(req.params._id);
    console.log('req.params->', req.params);
    const recipeDeleted = yield recipe.findOneAndDelete({ _id: cleanId });
    res.send(recipeDeleted);
}));
app.post('/recipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecipe = { title: req.body.title, content: req.body.content };
    yield recipe.insertOne(newRecipe);
}));
