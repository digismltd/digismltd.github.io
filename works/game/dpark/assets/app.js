$(document).ready(function() {
   console.log('- js.app ready')
})

// ***** INIT APP
console.log('- js.app init')
var app = {
  conf: {
  },
  data: {
    proj: 'dpark',
    camp: 'testonly',
    yyyymmdd: moment().format('YYYYMMDD'),
    items: [],
    gifts: [],
    gift: {},
    loading: false
  }
}

localStorage.setItem('LICENSE', '推廣生意的競賽牌照號碼：DEMO'); // SAVE LICENSE
