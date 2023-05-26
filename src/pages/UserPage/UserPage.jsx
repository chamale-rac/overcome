import React, { useEffect, useState } from 'react'
import { useApi } from '@hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { NavButton, Chat } from '@components/global'
import * as styles from './UserPage.module.css'
import { authStore } from '@context'

const UserPage = () => {
  const { auth } = authStore
  const navigate = useNavigate()
  const { creator_id } = useParams()
  const { handleRequest } = useApi()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getUserDetails = async (_id) => {
    try {
      setLoading(true)
      const response = await handleRequest(
        'GET',
        `/users/${_id}`,
        {},
        {
          Authorization: 'Bearer ' + auth.authToken,
        },
        true,
      )
      console.log(response.data)
      setUser(response.data)
    } catch (error) {
      console.error(error)
      setError(
        'Error fetching event details, please try again later or contact support',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails(creator_id)
  }, [])

  return (
    <div className={`${styles.container} standard_border`}>
      <div className={styles.profile_info_container}>
        <NavButton
          type="normal"
          handleClick={() => navigate(-1)}
          customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base mb-20"
        >
          ⇐ Back
        </NavButton>
        {user && (
          <>
            <div className={styles.title_wrapper}>
              <h2 className={`${styles.event_title} font-bebas-neue`}>
                {user?.username}
              </h2>
            </div>

            <hr
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: '#333',
                border: 'none',
                margin: '0px 0',
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default UserPage
