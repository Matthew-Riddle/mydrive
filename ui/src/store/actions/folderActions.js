import axios from '../../axiosInstance'

export const GET_FOLDER = 'GET_FOLDER'
export const GET_FOLDERS = 'GET_FOLDERS'
export const UPDATE_FOLDER = 'UPDATE_FOLDER'
export const CREATE_FOLDER = 'CREATE_FOLDER'
export const DELETE_FOLDER = 'DELETE_FOLDER'
export const ARCHIVE_FOLDER = 'ARCHIVE_FOLDER'

const getFolder = folder => ({
  type: GET_FOLDER,
  folder
})

export const getFolderAsync = () => dispatch => {
  axios.get('/folder/{id}').then(response => {
    dispatch(getFolder(response.data))
  })
}

const getFolders = folders => ({
  type: GET_FOLDERS,
  folders
})

export const getFoldersAsync = () => dispatch => {
  axios.get('/folder').then(response => {
    dispatch(getFolders(response.data))
  })
}

const updateFolder = folder => ({
  type: UPDATE_FOLDER,
  folder
})

export const updateFolderAsync = (id, data) => dispatch => {
  axios.put(`/folder/${id}`, data).then(response => {
    dispatch(updateFolder(response.data))
  })
}

const createFolder = folder => ({
  type: CREATE_FOLDER,
  folder
})

export const createFolderAsync = data => dispatch => {
  axios
    .post('/folder', data, { headers: { 'content-type': 'application/json' } })
    .then(response => {
      dispatch(createFolder(response.data))
    })
}
const archiveFolder = folder => ({
  type: ARCHIVE_FOLDER,
  folder
})

export const archiveFolderAsync = id => dispatch => {
  axios.delete(`/folder/${id}`).then(response => {
    dispatch(archiveFolder(response.data))
  })
}

const deleteFolder = folder => ({
  type: DELETE_FOLDER,
  folder
})

export const deleteFolderAsync = id => dispatch => {
  axios.delete(`/folder/${id}`).then(response => {
    dispatch(deleteFolder(response.data))
  })
}
