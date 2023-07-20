import React from 'react'
import * as styles from './FilePicker.module.css'

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className={`${styles.container} `}>
      <div className={styles.uploader}>
        <label className={`${styles.likeButton}`} htmlFor="file-upload">
          <span>📸 Upload a photo...</span>
          <p>{file === '' ? '⚠️ No image selected' : file.name}</p>
        </label>
        <input
          style={{ display: 'none' }}
          id="file-upload"
          name="file-upload"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            console.log('uploaded file')
            readFile(e.target.files[0])
          }}
        />
      </div>
    </div>
  )
}

export default FilePicker
