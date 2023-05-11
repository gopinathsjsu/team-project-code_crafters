import axios from 'axios'
import { config } from '../../Constants'

export const bookApi = {
  authenticate,
  signup,
  updateUser,
  numberOfUsers,
  numberOfBooks,
  getUsers,
  getClassesByText,
  deleteUser,
  getBooks,
  deleteBook,
  deleteClasses,
  addBook,
  getMemberships,
  getMembershipsall,
  addMembership,
  updateMembership,
  clockInOut,
  getTodaysClockInOutData,
  getUsersByExpiryByWeek,
  addClasses,
  getClasses,
  updateClasses,
  deleteMembership,
  deleteInstructor,
  addInstructor,
  getInstructors,
  updateInstructor,
  getLocations,
  getUserById,
  addRegisteredClasses,
  getRegisteredClasses,
  getAllClassesByLocation,
  logHours,
  getLogHours,
  getclassschedule,
  getMachineData

}
function getClassesByText(user, text) {
  const url = `/api/classes/by-text/${text}`
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}
function getUserById(user, id) {
  const url = `/api/users/user-by-id/${id}`
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}
function getInstructors(user) {
  const url = '/api/instructors'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function getMachineData(user) {
  const url = '/api/log-hours/total-machine-hours'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}
function getLogHours(user) {
  const id = user.id
  const url = '/api/log-hours/'+id
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}
function logHours(user, data) {
  return instance.post('/api/log-hours', data, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function addInstructor(user, instructor) {
  return instance.post('/api/instructors', instructor, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}

function updateInstructor(user, instructor) {
  return instance.put('/api/instructors', instructor, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function deleteInstructor(user, id) {
  return instance.delete(`/api/instructors/${id}`, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function getClasses(user) {
  const url = '/api/classes'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function updateClasses(user,classes) {
  return instance.put('/api/classes', classes, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function addClasses(user, classes) {
  return instance.post('/api/classes', classes, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function getUsersByExpiryByWeek(user) {
  const url = '/api/users/expiry-by-week'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function getMemberships(user, text) {
  const url = text ? `/api/membership?text=${text}` : '/api/membership'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}
function getMembershipsall(text) {
  const url = text ? `/api/membership?text=${text}` : '/api/membership'
  return instance.get(url)
}
function getTodaysClockInOutData(user) {
  const url = '/api/clock'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function signup(user) {
  return instance.post('/auth/signup', user, {
    headers: { 'Content-type': 'application/json' }
  })
}
function updateUser(user,data) {
  return instance.put('/api/users/update', data, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function clockInOut(user,data) {
  return instance.post('/api/clock', data, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function numberOfUsers() {
  return instance.get('/public/numberOfUsers')
}

function numberOfBooks() {
  return instance.get('/public/numberOfBooks')
}

function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : '/api/users'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}
function getLocations(user, username) {
  const url = username ? `/api/users/${username}` : '/api/users/locations'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function getBooks(user, text) {
  const url = text ? `/api/books?text=${text}` : '/api/books'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function deleteBook(user, isbn) {
  return instance.delete(`/api/books/${isbn}`, {
    headers: { 'Authorization': basicAuth(user) }
  })
}
function deleteClasses(user, id) {
  return instance.delete(`/api/classes/${id}`, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function deleteMembership(user, id) {
  return instance.delete(`/api/membership/${id}`, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function addBook(user, book) {
  return instance.post('/api/books', book, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function addMembership(user, membership) {
  return instance.post('/api/membership', membership, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
function updateMembership(user, membership) {
  return instance.put('/api/membership', membership, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}
// -- Axios

function addRegisteredClasses(user, registeredclasses) {
  return instance.post("/api/registered-classes", registeredclasses,  {
    headers: {
      'Content-type': 'application/json',
      'Authorization': basicAuth(user)
    }
  })
}

function getRegisteredClasses(user, id) {
  const url = id ? `/api/registered-classes?text=${id}` : '/api/registered-classes'
  return instance.get(url, {
    headers: { 'Authorization': basicAuth(user) }
  })
}

function getAllClassesByLocation(){
    const url = '/api/classes/getAllClassesByLocation'
    return instance.get(url)
}

function headers() {

}

function getclassschedule(){
  const url = 'http://localhost:8080/api/classes/allClassesByLocation'
  return instance.get(url)
}




const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

// -- Helper functions

function basicAuth(user) {
  return `Basic ${user.authdata}`
}