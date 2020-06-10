export const url = 'https://drp38-backend.herokuapp.com'
export const axios = require('axios');

export const urlList = {
  restaurants: url + 'restaurants',
  preparedOrders: url + '/orders/status/prepared',
  preparingOrders: url + '/orders/status/preparing',
  pastOrders: url + '/orders/status/past',
  makeOrder: url + '/orders/add',
  items: url + '/items/'
}