import React, { useEffect } from 'react'
import './SectionScreen.css'
import Section from '../Section/Section'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import { db } from '../../firebase'

const  SectionScreen=()=> {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [folders, setFolders] = React.useState([])
    const [newFolderName, setNewFolderName] = React.useState(null)

    const handleFolderSave = () => {
        db.collection('sections')
            .add({
                sectionName: newFolderName,
                contents: [],
            })
            .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id)
            })
            .catch(function (error) {
                console.error('Error adding document: ', error)
            })

        setModalOpen(false)
    }
    const handleChange = (event) => {
        setNewFolderName(event.target.value)
    }

    const handleAddButton = () => {
        setModalOpen(true)
    }

    useEffect(() => {
        db.collection('sections').onSnapshot((snapshot) => {
            setFolders(snapshot.docs.map((doc) => doc.data()))
        })
    }, [])


    return (
            <div className="sectionScreen">

                <Button
                    className="sectionScreen_addSectionButton"
                    style={{color: 'white'}}
                    variant="outlined"
                    color="default"
                    startIcon={<AddIcon />}
                    onClick={handleAddButton}
                >
                    Create new folder
                </Button>

                <div className="sectionScreen_content">
                    {folders.map((folder) => {
                        return <Section name={folder.sectionName} />
                    })}
                </div>

                <Dialog open={modalOpen} maxWidth="xl">
                    <DialogTitle id="form-dialog-title">Folder Name</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the name of new folder to be created
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="folderName"
                            fullWidth
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setModalOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFolderSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

    )
}

export default SectionScreen
