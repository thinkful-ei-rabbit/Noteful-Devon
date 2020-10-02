import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'
import './AddNote.css'



export default class AddNote extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props)
    this.state ={
      newNote: {
        value: '',
        touched: false
      }
    }
  }

  updateNewNote(newNote) {
    this.setState({ newNote: {
      value: newNote,
      touched: true
    }})
  }

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
    fetch(`${config.API_ENDPOINT}api/notes`, options)
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

  validateNoteName() {
    const newNote = this.state.newNote.value.trim();
    if (newNote.length === 0) {
      return 'Name is required'
    } else if (newNote.length <3) {
      return "Name must be at least 3 letters long"
    } else {
      return ''
    }
  }

  render() {
    const newNoteError = this.validateNoteName();

    const optionsArr = this.context.folders.map(folder => 
      <option key={folder.id} value={folder.id} name={folder.name}>{folder.name}</option>
    )

    return (
      
      <form className="form" onSubmit={this.handleAddNote}>
        <ul className='wrapper'>
          <li className='form-row'>
            <label>Create New Note:</label>
          </li>
          <li className='form-row'>
            <label htmlFor='folders'>Folders</label>
            <select id='folders' name='folders' required>
              {optionsArr}
            </select>
          </li>
          <li className='form-row'>
            <label htmlFor='name'>Name</label>
            <input id='name' name='name' required
            onChange={e => this.updateNewNote(e.target.value)} />
            {this.state.newNote.touched && <ValidationError message={newNoteError} />}
          </li>
          <li className='form-row'>
            <label htmlFor='content'>Content</label>
            <textarea id='content' name='content' required/>
          </li>
          <li className='form-row'>
            <button
              className='AddFolderForm'
              type='submit'
              disable={this.validateNoteName()}>
                 Add Note
            </button>
          </li>
        </ul>
      </form>
      
    )
  }
};