const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// endpoints

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

router.post("/", (req, res) => {
  const newAccount = req.body;

  db("accounts")
    .insert(newAccount, "id") // look up .insert
    .then((ids) => {
      db("accounts")
        .where({ id: ids[0] })
        .first()
        .then((account) => {
          res.status(200).json({ data: account });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
          });  
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("accounts")
    .where({ id: id }) // check on this .where syntax
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ count });
      } else {
        res.status(404).json({ message: "there was no account to update" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where({ id: id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ count });
      } else {
        res.status(404).json({ message: "there was no account to update" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

// might need to fix .catch as per guided projected example

module.exports = router;
