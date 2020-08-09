import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import DetailCard from '../Common/DetailCard'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField/TextField'
import DialogActions from '@material-ui/core/DialogActions/DialogActions'
import Dialog from '@material-ui/core/Dialog/Dialog'
import { db } from '../../firebase'
import LinkEntry from "./LinkEntry";
import PlayCircleFilledIcon from "@material-ui/core/SvgIcon/SvgIcon";
import './SectionContent.css'


export default function SectionContent(props) {
    const [value, setValue] = React.useState(0)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [urlDetails, setUrlDetails] = React.useState({})
    const [section, setSection] = React.useState({})

    useEffect(() => {
        db.collection('sections').onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                if (doc.data().sectionName === props.match.params.sectionName) {
                    let obj = {}
                    obj['id'] = doc.id
                    obj['contents'] = doc.data().contents
                    setSection(obj)
                }
            })
        })
    }, [])

    const handleAddLinkClick = () => {
        setModalOpen(true)
    }

    const handleChange = (event, name) => {
        let obj = Object.assign({}, urlDetails)
        obj[name] = event.target.value
        obj['alreadyExist'] = true
        setUrlDetails(obj)
    }

    const handleChangeOfTabs = (event, newValue) => {
        setValue(newValue)
    }

    const handleLinkSave = () => {
        const newContentArray = section.contents ? section.contents : []
        newContentArray.push(urlDetails)
        db.collection('sections')
            .doc(section.id)
            .update({
                contents: newContentArray,
            })
            .then(() => {
                setModalOpen(false)
            })
    }

    return (
            <div className="body">
                <Button
                    style={{color: 'white'}}
                    variant="outlined"

                    startIcon={<AddIcon />}
                    onClick={handleAddLinkClick}
                >
                    Create new
                </Button>
                <div className="body__info">
                    <div className="body__infoText">
                        <h2>{props.match.params.sectionName.toUpperCase()}</h2>
                    </div>
                </div>

                <div className="body__songs">
                    {section?.contents?.map((content) => {
                        return <LinkEntry title={content.title} url={content.url} />
                    })}
                </div>
                <Dialog open={modalOpen} maxWidth="xl">
                    <DialogTitle id="form-dialog-title">Article Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the title and url of the article
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            onChange={(event) => handleChange(event, 'title')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Url"
                            fullWidth
                            variant="outlined"
                            onChange={(event) => handleChange(event, 'url')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setModalOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleLinkSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

    )
}
