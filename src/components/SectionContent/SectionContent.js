import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DetailCard from "../Common/DetailCard";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add'
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {db} from "../../firebase";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SectionContent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [urlDetails, setUrlDetails]= React.useState({})
    const [contentList, setContentList] = React.useState([])


    useEffect(()=>{
        let folders=[]
        db.collection('sections').onSnapshot((snapshot) => {
           folders=snapshot.docs.map((doc) => doc.data())
            const articleFolder = folders.filter(function (folder) {
                return folder.sectionName === 'articles'
            })[0]
            setContentList(articleFolder.contents)
        })

    },[])


    const handleAddLinkClick=()=>{
            setModalOpen(true)
    }

    const handleChange=(event, name)=>{
        let obj= Object. assign({}, urlDetails)
        obj[name]=event.target.value
       setUrlDetails(obj)
    }

    const handleChangeOfTabs = (event, newValue) => {
        setValue(newValue);
    };

    const handleLinkSave=()=>{
        const object = {
            url: urlDetails.url,
            title: urlDetails.title,
            alreadyExist: true

        }

    }


    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: '#013220'}}>
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChangeOfTabs}
                    aria-label="nav tabs example"
                >
                    <LinkTab label={<p style={{fontSize: '.8rem', fontWeight: 'bold'}}>publications</p>}  />
                    <LinkTab label={<p style={{fontSize: '.8rem', fontWeight: 'bold'}}>articles</p>} />

                </Tabs>
            </AppBar>
            <TabPanel  value={value} index={0}>
                <Button
                    variant="outlined"
                    color="default"
                    startIcon={<AddIcon/>}
                    onClick={handleAddLinkClick}
                >
                    Create new link
                </Button>

                <div className='sectionContent_tab'>
                    {contentList.map(content=>{
                        return <DetailCard title={content.title} url={content.url}/>
                    })}
                </div>
                <Dialog open={modalOpen} maxWidth="xl">
                    <DialogTitle id="form-dialog-title">Existing Article Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the title and url of the article
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            fullWidth
                            onChange={event => handleChange(event, 'title')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            fullWidth
                            onChange={event => handleChange(event, 'url')}
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
            </TabPanel>
            <TabPanel value={value} index={1}>
                Coming soon....
            </TabPanel>

        </div>
    );
}
