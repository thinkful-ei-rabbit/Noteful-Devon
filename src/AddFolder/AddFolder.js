import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import ValidationError from '../ValidationError'
import './AddFolder.css'


export default class AddFolder extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props)
    this.state = {
        newFolder: {
            value: '',
            touched: false,
        }
    }
}

  updateNewFolder(newFolder) {
    this.setState({ newFolder: {
      value: newFolder, 
      touched: true
    }})
  }

  handleAddFolder = e => {
    e.preventDefault()
    console.log(e)
    const folder = {
      name: e.target.addFolder.value
    }
    
    const options = {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      },
    }
    fetch(`${config.API_ENDPOINT}api/folders`, options)
    .then (res => {
      if(!res.ok) {
        throw new Error ("Something went wrong")
      }
      return res.json();
    })
    .then (folder => {
      this.context.addFolder(folder)
      this.props.history.push('/')
  
    })
    .catch(err => {
      console.log (err.message)
    })
  
    }

    validateFolderName() {
      const newFolder = this.state.newFolder.value.trim();
      if (newFolder.length === 0) {
        return "Name is required"
      } else if (newFolder.length <3) {
        return "Name must be at least 3 letters long"
      }else {
        return ''
      }
    }

  
  render() {
    const newFolderError = this.validateFolderName();

    return (
      <form className="form" onSubmit={this.handleAddFolder}>
        <ul className='wrapper'>
          <li className='form-row'>
            <label htmlFor='addFolder'>Create New Folder:</label>
          </li>
          <li className='form-row'>
            <input 
            type='text'
            id='addFolder' 
            name='addFolder' 
            aria-required='true'
            aria-describedby='addFolderName'
            aria-label='Create New Folder'
            onChange={e => this.updateNewFolder(e.target.value)}/>
            {this.state.newFolder.touched && <ValidationError message={newFolderError}/>}
          </li>
          <li className='form-row'>
          <button className="form-button"
            type='submit'
            value='submit'
            disabled={this.validateFolderName()}>
              Add Folder</button>
          </li>
        </ul>
      </form>
    )
  }
};

