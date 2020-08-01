import React, {Fragment} from 'react'
import SectionScreen from "./components/SectionScreen/SectionScreen";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SectionContent from "./components/SectionContent/SectionContent";
import Header from "./components/Header/Header";



function App() {
    return (
        <Fragment>
            <Header/>
            <Router>
                <Route exact path="/" component={SectionScreen}></Route>
                <Route exact path="/:sectionName" component={SectionContent}></Route>
            </Router>
        </Fragment>


    )
}
export default App
