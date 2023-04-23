import React, { Fragment, useEffect, useState } from 'react'
import Game from './Game'

function Init({ maxScore, setMaxScore }) {
    const [initGame, setInitGame] = useState(false)

    const initHandle = (e) => {
        e.preventDefault()
        setInitGame(true)
    }
    
    return (
        <Fragment>
            {initGame ? <Game maxScore={maxScore} setMaxScore={setMaxScore} />
            :
            <div className="container h-100 d-inline-block">
                <h3 className='my-2'>El objetivo del juego es mantener la paridad del peso con el dólar.</h3>

                <div className=''>
                    <img 
                        className='elcarlo-img' 
                        src='images/carlo1ro.jpg' 
                        alt='Carlitos' />
                </div>

                <button
                    type="button"
                    className="btn menem-boton mb-3"
                    onClick={(e)=>initHandle(e)}>
                        No los voy a defraudar
                </button>
            </div>
            }
        </Fragment>
    )
}

export default Init