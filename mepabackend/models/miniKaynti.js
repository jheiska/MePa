const Sequelize = require('sequelize')

const MiniKaynti = sequelize.define('minikaynti', {
    kavija: {
      type: Sequelize.TEXT
    },
    satama: {
      type: Sequelize.TEXT
    },
    laiva: {
        type: Sequelize.TEXT
    }
})

module.exports = MiniKaynti


/*
MiniKaynti.sync({force: true}).then(() => {
    // Table created
    return MiniKaynti.create({
      kavija: 'Jaakko',
      satama: 'Kalasatama',
      laiva: 'Kalastaja'
    });
  });
*/
/*
MiniKaynti.create({
      kavija: 'Jaakko',
      satama: 'Kalasatama',
      laiva: 'Kalastaja'
  })
  .then(()=> {console.log('lisatty')})
*/