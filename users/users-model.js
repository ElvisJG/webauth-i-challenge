const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db('users');
}

function findBy(filter) {}

function add(user) {}

function findById(id) {}
