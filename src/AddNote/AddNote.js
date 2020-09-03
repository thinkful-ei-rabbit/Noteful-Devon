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
      
      <form className="form" onSubmit={this.handleAddNote}>
        <ul className='wrapper'>
          <li className='from-row'>
            <label>Create New Note:</label>
          </li>
          <li className='from-row'>
            <label htmlFor='folders'>Folders</label>
            <select id='folders' name='folders'>
              {optionsArr}
            </select>
          </li>
          <li className='from-row'>
            <label htmlFor='name'>Name</label>
            <input id='name' name='name'/>
          </li>
          <li className='from-row'>
            <label htmlFor='content'>Content</label>
            <textarea id='content' name='content'/>
          </li>
          <li className='from-row'>
            <button
              className='AddFolderForm'
              type='submit'        
              >Add Note
            </button>
          </li>
        </ul>
      </form>
    )
  }
};