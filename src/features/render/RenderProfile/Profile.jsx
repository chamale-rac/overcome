import { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { authStore } from '@context'
import { Events } from '@features/render'
import { ImageCustomizer } from '@features/creation'
import { ControlledPopup, ClockLoader } from '@components/global'
import * as styles from './Profile.module.css'
import { image } from '@context'
import EditProfile from '../../creation/EditProfile/EditProfile'
import { FriendRequests } from '@features/render'
import SkeletonElement from '@components/skeletons/SkeletonElement'
import Shimmer from '@components/skeletons/Shimmer'
import ProfileLoader from './ProfileLoader/ProfileLoader'

function Profile() {
  const [error, setError] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  const { handleRequest } = useApi()
  const [user, setUser] = useState({})
  const [userid, setUserid] = useState({})
  const [users, setUsers] = useState([])

  const [openProfilePopup, setOpenProfilePopup] = useState(false)
  const [openInfoPopup, setOpenInfoPopup] = useState(false)
  const [openRequestPopup, setOpenRequestPopup] = useState(false)

  const closeProfilePopup = () => setOpenProfilePopup(false)
  const closeInfoPopup = () => setOpenInfoPopup(false)
  const closeRequestPopup = () => setOpenRequestPopup(false)

  const { auth } = authStore

  const editProfile = async (newImage) => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'POST',
        `/users/editInfo/${auth.user.id}`,
        {
          profilePicture: newImage,
        },
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      /* console.log(response.data)*/
      // add just a new field or update the profilePicture field
      setUser({ ...user, profilePicture: newImage })
      image.result = ''
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSaveImage = (newImage) => {
    /* console.log('is saving')*/
    editProfile(newImage)
  }

  const getUsers = async () => {
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    const response = await handleRequest(
      'GET',
      '/users/',
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    /* console.log('USERS!', response)*/
    setUsers(response.data)
  }

  const getUser = async () => {
    setProfileLoading(true)
    // const response = await handleRequest('GET', '/users/', {}, {}, true)
    /* console.log('testttt', auth.user.id)*/
    const response = await handleRequest(
      'GET',
      `/users/${auth.user.id}`,
      {},
      {
        Authorization: 'Bearer ' + auth.authToken,
      },
      true,
    )
    /* console.log('USER!!!', response)*/
    setUser(response.data)
    setProfileLoading(false)
  }

  useEffect(() => {
    /* console.log(auth)*/
    /* console.log(auth.user.username, auth.user.id)*/
    getUser()
    setUserid({
      username: auth.user.username,
      userid: auth.user.id,
    })
  }, [auth])

  useEffect(() => {
    console.log('Var user', user)
  }, [user])

  useEffect(() => {
    /* console.log(users)*/
  }, [users])

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={styles.container}>
      <ControlledPopup
        title={'👥 Friend Requests'}
        isOpen={openRequestPopup}
        closeFunction={closeRequestPopup}
      >
        <FriendRequests />
      </ControlledPopup>
      <ControlledPopup
        title={'🖼️ Profile Picture'}
        isOpen={openProfilePopup}
        closeFunction={closeProfilePopup}
      >
        {loading ? (
          <div className={styles.loading}>
            <ClockLoader fontSize="5" />
            <span>Updating profile picture...</span>
          </div>
        ) : (
          <ImageCustomizer
            actualImage={user.profilePicture ?? '/profile-400.png'}
            saveNewImage={handleSaveImage}
          />
        )}
      </ControlledPopup>
      <ControlledPopup
        title={'Profile Info'}
        isOpen={openInfoPopup}
        closeFunction={closeInfoPopup}
      >
        <EditProfile
          user={user}
          successAction={(values) => {
            setUser({
              ...user,
              ...values,
            })
            setOpenInfoPopup(false)
          }}
        />
      </ControlledPopup>
      <div className="w-full flex flex-row justify-end gap-2 text-xs md:text-sm">
        <button
          type="button"
          onClick={() => {
            setOpenRequestPopup((o) => !o)
          }}
          className="border py-1  md:p-2 rounded-xl border-black bg-black text-white hover:bg-[#cdd57e] hover:text-black transition-all"
        >
          Friend Requests
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenInfoPopup((o) => !o)
          }}
          className="border py-1 md:p-2  border-dashed rounded-xl  border-black hover:bg-[#cdd57e] transition-all"
        >
          Edit Info
        </button>
        <button
          type="button"
          onClick={() => setOpenProfilePopup((o) => !o)}
          className="border py-1  md:p-2  border-dashed  rounded-xl border-black hover:bg-[#cdd57e] transition-all"
        >
          Edit Picture
        </button>
      </div>
      { !profileLoading ? (
        <>
          <div className="flex w-full flex-col justify-start mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4 ">
                <div className="relative h-20 w-20 md:h-24 md:w-24 object-cover">
                  <img
                    src={user.profilePicture ?? '/profile-400.png'}
                    alt="Profile Image"
                    className="rounded-full object-fill shadow-2xl h-20 w-20 md:h-24 md:w-24"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-left  font-bold text-light-1 text-3xl md:text-5xl">
                    {`${user.name} ${user.lastname}`}
                  </h2>
                  <p className="font-medium text-gray-500 text-base md:text-xl  ">
                    @{user.username}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 max-w-lg text-light-2 ml-2 xs:ml-0 text-xs md:text-base">
              <p className="text-left">
                <span className="font-bold">Interests:</span>{' '}
                {user?.interests && user?.interests.length > 0
                  ? user?.interests?.join(', ')
                  : 'No interests found'}
              </p>
              <p className="text-left">
                <span className="font-bold">Favorite Games:</span>{' '}
                {user?.favorites && user?.favorites.length > 0
                  ? user?.favorites?.join(', ')
                  : 'No favorite games found'}
              </p>
            </div>
            <div className="mt-6 h-0.5 w-full bg-black" />
          </div>
          <section>
            <h2 className="text-4xl mt-6 mb-1">Joined Hooks</h2>
            <div className="grid grid-cols-1 gap-3 md:gap-6 divide-y divide-zinc-200 md:grid-cols-4">
              {user?.joinedEvents && user?.joinedEvents.length > 0 ? (
                <Events events={user.joinedEvents} inProfile={true} />
              ) : (
                <div>No joined events found! 😔</div>
              )}
            </div>
            <h2 className="text-4xl mt-6 mb-1">Saved Hooks</h2>
            <div className="grid grid-cols-1 gap-3 md:gap-6 divide-y divide-zinc-200 md:grid-cols-4">
              {user?.savedEvents && user?.savedEvents.length > 0 ? (
                <Events events={user.savedEvents} inProfile={true} />
              ) : (
                <div>No saved events found! 😔</div>
              )}
            </div>
          </section>
        </>
      ) : (
          <ProfileLoader />
      )}
    </div>
  )
}

export default Profile
