import { Link } from 'react-router-dom'
import './section.scss'

const Section = (props) => {
    let typeOfData = props.children.props.children
    console.log('type of data', typeOfData)
    return (
        <div className="section">
            {typeOfData}
            <div className="carousel">
                <div className="carousel__inner">{props.info && props.info.map((infoItem, index)=>{
                    return (
                        <div key={index} className="section-card">
                            <Link to={{ pathname: "/events", infoItem, typeOfData, props: {...props} }}>
                                <img className="section-card__img" src={infoItem.image}></img>
                            </Link>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Section