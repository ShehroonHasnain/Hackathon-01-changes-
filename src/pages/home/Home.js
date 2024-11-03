import React from 'react'
import Navbar from '../../components/navBar/Navbar'

import CreateNotes from '../../components/createNotes/CreateNotes'
import NoteListing from '../../components/noteListing/NoteListing'
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import  "./Home.css"


export default function Home() {
  return (
    <div className='home-container'>
    <div className="navbar"><Navbar/></div>
    <section className='center-layout'>
    <aside className='left-aside-layout'>

<LeftSideBar/>
    </aside>
    <main className='main-layout'>
    <CreateNotes/>
    <NoteListing/>
    </main>
    
    
    </section>
    </div>
  )
}
