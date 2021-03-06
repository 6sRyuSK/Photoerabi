import { useQuery, getSession, useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import React, { Suspense, useEffect, useState } from "react"
import photoPath from "../constant/photos.json"
import getMyFavorites from "../favorites/queries/getMyFavorites"
import createFavorite from "../favorites/mutations/createFavorite"
import deleteMyFavorite from "../favorites/mutations/deleteMyFavorite"

type PhotoComponentProps = {
  photo: {
    name: string
    path: string
    favorited: boolean
  }
  userId: number
}

const PhotoComponent: React.FC<PhotoComponentProps> = ({ photo, userId }) => {
  const { name, path, favorited } = photo
  const [favorite, setFavorite] = useState<boolean>(favorited)
  const [addFavorite] = useMutation(createFavorite)
  const [removeMyFavorite] = useMutation(deleteMyFavorite)
  const onFavorite = () => {
    if (favorite === false) {
      addFavorite({ name, userId }).catch((err) => {
        throw new Error(err)
      })
    } else {
      removeMyFavorite({ name }).catch((err) => {
        throw new Error(err)
      })
    }
    setFavorite(!favorite)
  }
  return (
    <div className="m-4" onDoubleClick={onFavorite}>
      <div className="flex">
        <p>{name}</p>
        <div onClick={onFavorite}>
          {favorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </div>
      </div>
      <img src={path} className="w-full" />
    </div>
  )
}

type PhotosProps = {
  photos: PhotoComponentProps["photo"][]
  userId: number
}

const Photos: React.FC<PhotosProps> = (props) => {
  // const currentUser = useCurrentUser()
  // if (!currentUser) return <p>Not Authenticated</p>
  return (
    <div className="m-4 grid xl:grid-cols-3">
      {props.photos &&
        props.photos.map((val) => {
          return <PhotoComponent key={val.name} photo={val} userId={props.userId}></PhotoComponent>
        })}
    </div>
  )
}

export default Photos

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res)
  const currentFavorites = await getMyFavorites(null, { session })
  const photos = photoPath.map((val) => {
    return {
      name: val.name,
      path: val.path,
      favorited: currentFavorites ? !!currentFavorites.find((f) => f.name === val.name) : false,
    }
  })
  return {
    props: {
      photos: photos,
      userId: session.userId,
    },
  }
}
