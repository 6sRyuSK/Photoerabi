import photoPath from "../constant/photos"

type PhotoComponentProps = {
  name: string
  path: string
}

const PhotoComponent: React.FC<PhotoComponentProps> = ({ name, path }) => {
  return (
    <div className="m-4">
      <p>{name}</p>
      <img src={path} className="w-full" />
    </div>
  )
}

const Photos: React.FC = () => {
  return (
    <div className="m-4 grid xl:grid-cols-3">
      {photoPath.map((val) => {
        return <PhotoComponent key={val.name} {...val}></PhotoComponent>
      })}
    </div>
  )
}

export default Photos
