import React from "react"
import Root from "../Root"
import Head from "../Head"
import Header from "components/Header"
import Experience from "components/sections/Experience"
import Intro from "components/sections/About"
import Projects from "components/sections/Projects"
import Contact from "components/sections/Contact"
import OthersProjects from "components/sections/OtherProjects"

const Index = ({ location }) => {
    return (
        <Root location={location}>
            <main>
                <Head title="Accueil" />
                <Header />
                <Intro />
                <Experience />
                <Projects />
                <OthersProjects />
                <Contact />
            </main>
        </Root>
    )
}

export default Index