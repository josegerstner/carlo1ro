import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Score from './Score'

function Game({ maxScore, setMaxScore }) {
    const [dolar, setDolar] = useState(1)
    const [venderCSS, setVenderCSS] = useState('success')
    const [comprarCSS, setComprarCSS] = useState('danger')
    const [variacion, setVariacion] = useState(0)
    const [causaEnd, setCausaEnd] = useState('')
    const [ganar, setGanar] = useState(0)
    const [segundos, setSegundos] = useState(0)
    const [score, setScore] = useState(0)
    const [porcentajeVictoria, setPorcentajeVictoria] = useState(0)
    const VICTORIA = 20
    const MAX_LIMIT = 15
    const MIN_LIMIT = 0.04
    const MAX_GANAR = 1.65
    const MIN_GANAR = 0.45
    const TIEMPO_CAMBIO = 0.9

    useEffect(()=>{
        const scoreParam = location.search.substring(location.search.indexOf('maxscore=')+9)
        console.log('max score game',scoreParam?scoreParam:0)
        setMaxScore(scoreParam)
    },[])

    useEffect(()=>{
        const cambia = dolar+variacion
        setDolar(cambia)

        // Función para cambiar el tipo de cambio cada tanto tiempo
        setTimeout(() => {
            getRandomArbitrary()
        }, TIEMPO_CAMBIO * 1000)

        setTimeout(() => {
            setSegundos(segundos+1)
        }, 1000)
    },[variacion])

    useEffect(() => {
        setScore(score + segundos*5)
    },[segundos])

    useEffect(()=>{
        if(dolar>=1){
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

    // console.log('maxScore', maxScore)

    function getRandomArbitrary() {
        const min=0.000000000001, max=0.5
        setVariacion(Math.random() * (max - min) + min)
    }

    const dolarGame = () =>{
        if(dolar>MIN_GANAR && dolar<MAX_GANAR){
            const newGanar = ganar+1
            setGanar(newGanar)
            setScore(score + newGanar*10)
        } else {
            setGanar(0)
        }
    }

    const handleComprar=(e)=>{
        e.preventDefault()
        setDolar(dolar*0.8)
        dolarGame()
    }

    const handleVender=(e)=>{
        e.preventDefault()
        setDolar(dolar*1.2)
        dolarGame()
    }

    return (
        <div className="container h-75 d-inline-block">
        {causaEnd!==''?
            <Navigate to={`/gameover/${causaEnd.toLowerCase()}?${score}`}  maxScore={maxScore} setMaxScore={setMaxScore} replace={true} />
        :
            <div className="container">
                <Score score={score} maxScore={maxScore} />
                <div className="container">
                    <h3 className='text-center'>$1 = U$D{parseFloat(dolar.toFixed(10))}</h3>
                </div>
                <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: `${porcentajeVictoria}%`}}></div>
                </div>
                <div className="container row mt-2 mb-3 mx-0">
                    <button type="button" className={`btn col game-button btn-${comprarCSS}`} onClick={(e)=>handleComprar(e)}>Comprar Reservas</button>
                    <button type="button" className={`btn col game-button btn-${venderCSS}`} onClick={(e)=>handleVender(e)}>Vender Reservas</button>
                </div>
            </div>
            }
        </div>
    )
}

export default Game