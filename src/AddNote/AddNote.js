import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'



export default class AddNote extends Component {
  static defaultProps ={
    addNote: () => {},
  }


  static contextType = ApiContext;

  handleAddNote = e => {
    e.preventDefault()

    const note= {
      name: e.target.name.value,
      modified: new Date().toISOString(),
      folderId: e.target.folders.value,
      content: e.target.content.value
    }
    
    const options = {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      },
    }
    fetch(`${config.API_ENDPOINT}/notes`, options)
    .then (res => {
      if(!res.ok) {
        throw new Error ("Something went wrong")
      }
      return res.json();
    })
    .then (note => {
      this.context.addNote(note) 
      this.props.history.push('/')
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  render() {
    const optionsArr = this.context.folders.map(folder => 
      <option key={folder.id} value={folder.id} name={folder.name}>{folder.name}</option>
    )

    return (
      //select folder to add note to
      <form className="form" onSubmit={this.handleAddNote}>
        <label htmlFor='folders'>Folders</label>
        <select id='folders' name='folders'>
          {optionsArr}
        </select>
        <label>Create New Note:</label><br />
        <label htmlFor='name'>Name</label>
        <input id='name' name='name'/><br />
        <label htmlFor='content'>Content</label>
        <textarea id='content' name='content'/><br />
        <button
          className='AddFolderForm'
          type='submit'        
        >Add Note</button>
      </form>
    )
  }
};