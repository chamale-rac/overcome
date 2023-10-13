import { useState, useEffect } from 'react'
import { useApi } from '@hooks'
import * as styles from './GlobalReports.module.css'
import Reports from '../Reports/Reports'
import { ClockLoader } from '@components/global'

function GlobalReports() {
  const [reports, setReports] = useState([])
  const { handleRequest } = useApi()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllReports()
  }, [])

  const getAllReports = async () => {
    setLoading(true)
    try {
      const response = await handleRequest(
        'GET',
        '/reports?type=Event',
        {},
        {},
        false,
      )
      setReports(response.data?.data?.reports)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <h1>Reports</h1>
      </div>

      {reports.length > 0 ? (
        <div className={styles.eventsContainer}>
          <Reports reports={reports} handleSuccess={getAllReports} />
        </div>
      ) : loading ? (
        <div className={`${styles.noEvents} font-bebas-neue`}>
          Loading... <ClockLoader fontSize={'3.8'} />
        </div>
      ) : (
        <div className={`${styles.noEvents} font-bebas-neue`}>
          No reports found! 😔
        </div>
      )}
    </div>
  )
}

export default GlobalReports
