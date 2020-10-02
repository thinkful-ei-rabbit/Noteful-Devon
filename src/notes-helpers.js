
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id == folderId)


export const findNote = (notes=[], noteId) => {
  console.log(notes)
  notes.find(note => note.id == noteId)
}
  

export const getNotesForFolder = (notes=[], folderId) => {
  return (!folderId)
    ? notes
    : notes.filter(note => note.folderid == folderId)
}

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderid == folderId).length
