import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Score from './Score'

function GameOver({ maxScore, setMaxScore }) {
    const [causa, setCausa] = useState('')
    const [causaIMG, setCausaIMG] = useState('')
    const [cosasQuePasan, setCosasQuePasan] = useState("")
    const [newScore, setNewScore] = useState(0)
    const cosasArray = [
        "sacaste tanta deuda externa que tus esbirros se hicieron los chinwenwenchas con los ahorros de la gente.",
        "para borrar evidencia del tráfico de armas, hiciste explotar la Fábrica Militar de Río Tercero dejando 7 personas facellidas y 300 heridas.",
        // "suspendiste el acuerdo de transferencia de tecnología nuclear a Irán y por venganza te hicieron volar la Embajada de Israel y la AMIA.",
        "como privatizaste YPF, Aerolíneas Argentinas y Telecom, las empresas recortaron a los estatales y ahora los tenés cortando medio país.",
        "gracias a tu política económica, ahora todos tenemos que pedir préstamos en dólares para poder comprar un kilo de pan.",
        "la toma indiscriminada de deuda pública y la corrupción de tu gobierno fueron tan notorias que el descontento social se empieza a descontrolar."
    ]

    useEffect(()=>{
        const path = location.pathname.substring(location.pathname.lastIndexOf('/')+1)
        // console.log('path',path);
        setCausa(path)
        setCausaIMG(`/images/${path}.jpg`)
        setNewScore(location.search.substring(location.search.indexOf('score=')+2))
        const aux = Math.round(getRandomInt())-1
        // console.log(aux)
        setCosasQuePasan(cosasArray[aux>(cosasArray.length-1)?cosasArray.length-1:aux])
    },[])

    useEffect(()=>{
        if(newScore>maxScore){
            setMaxScore(newScore)
        }
    },[newScore])

    function getRandomInt() {
        return Math.floor(Math.random() * (cosasArray.length + 1) + 1);
    }

    return (
        <div className="container">
            <Score score={newScore} maxScore={maxScore} />
            {causa==''?
                <Loading />
            :causa=='ganaste'?
            <Fragment>
                <h1>Nunca se gana</h1>
                <h5>Mantuviste al peso fuerte, pero {cosasQuePasan}</h5>
            </Fragment>
            :causa=='deflacion'?
            <Fragment>
                    <h1>El peso se valoró mucho...</h1>
                    <h3 className='text-justify'>El país entra en crisis porque el peso es poco competitivo. Los exportadores no están vendiendo nada. La gente se la pasa yendo a Miami en lugar de vacacionar en el país.</h3>
                </Fragment>
            :   <Fragment>
                    <h1>El peso se devaluó mucho...</h1>
                    <h3>El país entra en crisis porque para la gente cada vez sobra más mes en el sueldo.</h3>
                </Fragment>
            }
            {causa!=''?
                <img className='img-over' src={causaIMG} alt="Menem lo hizo" />
            :   <Loading />
            }
            {causa=='ganaste'?
                <h1>Tu presidencia termina en estallido social.</h1>
            :   <h1>Llaman a elecciones anticipadas.</h1>
            }
            <Link type="button" to={`/?maxscore=${maxScore}`} className="btn menem-boton mb-3">
                Ir a reelección
            </Link>
        </div>
    )
}

export default GameOver