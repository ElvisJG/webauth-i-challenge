exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'BarryAllen', password: 'TheFlash123' },
        { id: 2, username: 'IrisWestAllen', password: 'Iris-West-Allen' },
        { id: 3, username: 'HarrisonWells', password: 'ReverseFlash321' },
        { id: 4, username: 'CiscoRamon', password: 'vibe' },
        { id: 5, username: 'CaitlinSnow', password: 'KillerFrost' },
        { id: 6, username: 'JoeWest', password: 'hopeshedoesntguessthis' },
        { id: 7, username: 'CecileHorton', password: 'readingminds' }
      ]);
    });
};
