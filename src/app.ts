import express, { Request, Response } from "express";
import * as fs from "fs";
import * as mongoose from "mongoose";

import users from "./users.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.post("/users", (req: Request, res: Response) => {
  if (req.body.name.length >= 3 && req.body.age >= 0) {
    fs.writeFile(
      "users.json",
      `${JSON.stringify({ results: [...users.results, req.body] })}`,
      (err) => {
        if (err) {
          throw new Error(err.message);
        }
      }
    );
    res.status(201).json({ message: "User Created" });
  } else {
    throw new Error("Name - min lenght 3 and age > 0 ");
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.results[+id];
  if (!user) {
    throw new Error("User isn`t finded");
  } else {
    res.status(200).json({ message: "User updated" });
    users.results[+id] = req.body;
    fs.writeFile("users.json", `${JSON.stringify(users)}`, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.results[+id];
  if (!user) {
    throw new Error("Users isn`t finded");
  } else {
    res.status(200).json({ message: "User deleted" });
    users.results.splice(+id, 1);
    fs.writeFile("users.json", `${JSON.stringify(users)}`, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
});
const port = 4000;
app.listen(port, () => {
  mongoose.connect();
  console.log(`Example app listening on port ${port}`);
});
