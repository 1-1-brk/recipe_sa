import React from 'react'

export default function DEMOTRACKER() {
    const [show, setShow] = React.useState(true)
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    React.useEffect(() =>{
        function watchWidth(){
    console.log("setting")
    setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", watchWidth)
    return function(){
        // clean up function 
        console.log.apply("removing Listener")
        window.removeEventListener("resize", watchWidth)
    }
    },
    []
    )


  return (
    <div>
      <button onClick={() => setShow(show => !show)}>toggle windowTrackerVisability</button>
      {show && <label>window width: {window.innerWidth}</label>}
    </div>
  )
}
