import * as styles from './Reports.module.css'
import Report from '@components/global/Report'

const Reports = ({ reports, handleSuccess }) => {
  console.log('reportes :>> ', reports)
  return (
    <>
      {reports.map((report) => (
        <Report
          key={report._id}
          _id={report._id}
          whatIsGoingOn={report.whatIsGoingOn}
          name={report.eventId?.title}
          eventId={report.eventId?._id}
          comment={report.comments}
          //   hour={report.hour}
          //   date={report.date != undefined && report.date.substring(0, 10)}
          creator={report.reporter?.username}
          creator_id={report.reporter?._id}
          handleSuccess={handleSuccess}
        />
      ))}
    </>
  )
}

export default Reports
