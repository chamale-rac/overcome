import React, { useState } from 'react'
import { AIPicker, FilePicker, Button } from '@components/global'
import {
  SERVICES_BASE_URL,
  PROFILE_IMAGES_HEIGHT as height,
  PROFILE_IMAGES_WIDTH as width,
} from '@utils/constants'
import { reader } from '@utils/helpers'

import { useSnapshot } from 'valtio'
import { image } from '@context'

import * as styles from './ImageCustomizer.module.css'
import { authStore } from '../../../context'

const ImageCustomizer = (actualImage = '', saveNewImage) => {
  const snap = useSnapshot(image)
  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)

  const handleSaveImage = () => {
    const newImage = snap.result
    // saveNewImage(newImage)
    image.result = ''
  }

  const handleStoreImage = (result) => {
    console.log(result)
    image.result = result
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt')
    try {
      // IA API call
      setGeneratingImg(true)
      const response = await fetch(`${SERVICES_BASE_URL}/dalle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, height, width }),
      })
      const data = await response.json()
      handleStoreImage(`data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
    }
  }

  const readFile = (uploadedFile) => {
    reader(uploadedFile).then((result) => {
      handleStoreImage(result)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.imagesContainer}>
        <div className={styles.imageWrapper}>
          <img src={actualImage == !'' ? actualImage : '/profile-400.png'} />
        </div>
        {snap.result && !generatingImg && (
          <>
            <div className={styles.arrow}>⇒</div>
            <div className={styles.imageWrapper}>
              <img src={snap.result} alt="result" className={styles.image} />
            </div>
          </>
        )}
      </div>
      <div
        style={{
          width: `100%`,
        }}
      >
        <FilePicker file={file} setFile={setFile} readFile={readFile} />

        <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className={styles.buttonsContainer}>
        {snap.result && !generatingImg && (
          <Button
            customStyles="mb-1 mt-3 mr-1"
            type="secondary"
            onClick={() => (image.result = '')}
          >
            Cancel ✖
          </Button>
        )}
        {snap.result && !generatingImg && (
          <Button
            customStyles="mb-1 mt-3 ml-1"
            type="tertiary"
            onClick={() => handleSaveImage()}
          >
            Save changes 🗝️
          </Button>
        )}
      </div>
    </div>
  )
}

export default ImageCustomizer
