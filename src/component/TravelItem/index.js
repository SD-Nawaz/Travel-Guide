import './index.css'

const TravelItem = props => {
  const {travelDetails} = props
  const {name, description, imageUrl} = travelDetails

  return (
    <li className="travel-item">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default TravelItem
