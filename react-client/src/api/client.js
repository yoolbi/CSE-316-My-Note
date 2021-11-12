const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}

// Note
export const getNotesAPIMethod = () => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getNoteByIdAPIMethod = (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateNoteAPIMethod = (note) => {
    return fetch(`/api/notes/${note._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(note),
    }).then(checkStatus);
}

export const deleteNoteByIdAPIMethod = (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const createNoteAPIMethod = (note) => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(note),
    }).then(checkStatus)
        .then(parseJSON);
}

// User
export const getUsersAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getCurrentUserAPIMethod = () => {
    return fetch(`/api/currentUser`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}
export const getUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus);
}

export const deleteUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const createUserAPIMethod = (user) => {
    return fetch(`/api/register`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}

export const loginUserAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}

export const logoutUserAPIMethod = (user) => {
    return fetch(`/api/logout`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus);
        // .then(parseJSON);
}

export const uploadFileForUserAPIMethod = (userId, formData) => {
    return fetch(`/api/users/${userId}/file`, {
        // We do NOT want to set the default headers – the formData will automatically set the
        // headers to tell the server of the data type (which is different than the JSON
        // standard all the other API calls have been sending
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}

export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'yoolbi'
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        // We do NOT want to set the default headers – the formData will automatically set the
        // headers to tell the server of the data type (which is different than the JSON
        // standard all the other API calls have been sending
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}
