import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function Game() {
    const [dolar, setDolar] = useState(1)
    const [venderCSS, setVenderCSS] = useState('success')
    const [comprarCSS, setComprarCSS] = useState('danger')
    const [variacion, setVariacion] = useState(0)
    const [causaEnd, setCausaEnd] = useState('')
    const [ganar, setGanar] = useState(0)
    const [porcentajeVictoria, setPorcentajeVictoria] = useState(0)
    const VICTORIA = 20
    const MAX_LIMIT = 15
    const MIN_LIMIT = 0.04
    const MAX_GANAR = 1.65
    const MIN_GANAR = 0.45
    const TIEMPO_CAMBIO = 0.9

    useEffect(()=>{
        const cambia = dolar+variacion
        setDolar(cambia)

        setTimeout(() => {
            getRandomArbitrary()
        }, TIEMPO_CAMBIO * 1000)
    },[variacion])

    useEffect(()=>{
        if(dolar>1){
            setVenderCSS('danger')
            setComprarCSS('success')
        } else {
            setVenderCSS('success')
            setComprarCSS('danger')
        }
        game()
    }, [dolar])

    useEffect(()=>{
        setPorcentajeVictoria(ganar*100/(VICTORIA+1))
    },[ganar])

    function game(){
        if(ganar>VICTORIA){
            setCausaEnd('ganaste')
        }
        if(dolar<MIN_LIMIT){
            setCausaEnd('deflacion')
        }else if(dolar>MAX_LIMIT){
            setCausaEnd('inflacion')
        }
    }

    function getRandomArbitrary() {
        const min=0.000000000001, max=0.5
        setVariacion(Math.random() * (max - min) + min)
    }

    const dolarGame = () =>{
        if(dolar>MIN_GANAR && dolar<MAX_GANAR){
            setGanar(ganar+1)
        } else {
            setGanar(0)
        }
    }

    const handleComprar=(e)=>{
        e.preventDefault()
        setDolar(dolar*0.75)
        dolarGame()
    }

    const handleVender=(e)=>{
        e.preventDefault()
        setDolar(dolar*1.25)
        dolarGame()
    }

    return (
        <div className="container h-75 d-inline-block">
        {causaEnd!==''?
            <Navigate to={`/gameover/${causaEnd.toLowerCase()}`} replace={true} />
        :
            <div className="container">
                <div className="container">
                    <h1>$ 1 = U$D {dolar}</h1>
                </div>
                <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: `${porcentajeVictoria}%`}}></div>
                </div>
                <div className="container row mt-2 mb-3">
                    <button type="button" className={`btn col game-button btn-${comprarCSS}`} onClick={(e)=>handleComprar(e)}>Comprar Reservas</button>
                    <button type="button" className={`btn col game-button btn-${venderCSS}`} onClick={(e)=>handleVender(e)}>Vender Reservas</button>
                </div>
            </div>
            }
        </div>
    )
}

export default Game