import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import { Link } from 'react-router-dom'
import ValidationError from '../ValidationError'
import CircleButton from '../CircleButton/CircleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    fetch(`${config.API_ENDPOINT}/folders`, options)
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
            <label>Create New Folder:</label>
          </li>
          <li className='form-row'>
            <input type='text' name='addFolder' required 
            onChange={e => this.updateNewFolder(e.target.value)}/>
            {this.state.newFolder.touched && <ValidationError message={newFolderError}/>}
          </li>
          <li className='form-row'>
          {/* might have to change the button back to a regular button */}
          <CircleButton className="form-button"
            tag={Link}
            to='/'
            type='submit'
            value='submit'
            disabled={this.validateFolderName()}>
              <FontAwesomeIcon icon='plus' />
               Folder</CircleButton>
          </li>
        </ul>
      </form>
    )
  }
};

