import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'


export default class AddFolder extends Component {
  static defaultProps ={
    addFolder: () => {},
  }
  static contextType = ApiContext;

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
  
  render() {
    return (
      <form className="form" onSubmit={this.handleAddFolder}>
        <ul className='wrapper'>
          <li className='from-row'>
            <label>Create New Folder:</label>
          </li>
          <li className='from-row'>
            <input name='addFolder'/>
          </li>
          <li className='from-row'>
          <button className="form-button"
            type='submit'
            value='submit'>Add folder</button>
          </li>
        </ul>
      </form>
    )
  }
};

AddFolder.propTypes = {
  
}
