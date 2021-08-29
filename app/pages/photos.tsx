import photoPath from "../constant/photos"

type PhotoComponentProps = {
  name: string
  path: string
}

const PhotoComponent: React.FC<PhotoComponentProps> = ({ name, path }) => {
  return (
    <div>
      <p>name</p>
      <img src={path} />
    </div>
  )
}

const Photos: React.FC = () => {
  return (
    <div>
      {photoPath.map((val) => {
        return <PhotoComponent key={val.name} {...val}></PhotoComponent>
      })}
    </div>
  )
}

export default Photos
