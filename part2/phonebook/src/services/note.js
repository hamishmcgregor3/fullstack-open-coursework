import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

//get all persons

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

//add person 

const add = (newPersonObject) => {
    const request = axios.post(baseURL, newPersonObject)
    return request.then(response => response.data)
}

//delete person

const remove = (id) => { 
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

//update person's number

const update = (updatedPersonObject) => { 
    const request = axios.put(`${baseURL}/${updatedPersonObject.id}`, updatedPersonObject)
    return request.then(response => response.data)
}

export default { getAll, add, remove, update }