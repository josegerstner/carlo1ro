import React from 'react'

function Score({ score, maxScore }) {
  return (
    <div className="container row m-0">
        <div className="col-12 col-md-6">
            <div className="card m-1 m-md-2">
                <div className="card-body">
                    <h5>Score: {score}</h5>
                </div>
            </div>
        </div>
        <div className="col-12 col-md-6">
            <div className="card m-1 m-md-2">
                <div className="card-body">
                    <h5>Max score: {maxScore}</h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Score