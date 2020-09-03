// import React, { Component } from 'react'
// import ApiContext from '../ApiContext'
// import config from '../config'


// export default class AddNote extends Component {
//   static defaultProps ={
//     addNote: () => {},
//   }


//   static contextType = ApiContext;

//   handleAddNote = e => {
//     e.preventDefault()
//     console.log(e.target.addNote.value)

//     const note= {
//       name: e.target.val
//       modified: "something"
//       folderId: 'not sure how we get this?'
//       content: e.target.val
//     }
    
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(folder),
//       headers: {
//         'context-type': 'application/json'
//       },
//     }
//     fetch(`${config.API_ENDPOINT}/notes`, options)
//     .then (res => {
//       if(!res.ok) {
//         throw new Error ("Something went wrong")
//       }
//       return res.json();
//     })
//     .then (folder => {
//       this.setState ({
//         id: '',
//         name: '',

//       })
//       //this.props.handleAdd(folder);
//     })
//     .catch(err => {
//       this.setState ({
//         error: err.message
//       })
//     })
      
//     }
  
 

  
//   render() {
//     return (
//       //select folder to add note to
//       <form className="form">
//         <select>
          
//         </select>
//         <label>Create New Note:</label> 
//         <input name=''/><br />
//         <input name='' /><br />
//         <button
//           className='AddFolderForm'
//           type='submit'
//           onClick={this.handleAddNote}
//         >Add Note</button>
        



//       </form>
//     )
//   }
// };