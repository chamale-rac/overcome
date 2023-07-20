import React, { useState } from 'react'
import { AIPicker, FilePicker } from '@components/global'
import {
  SERVICES_BASE_URL,
  PROFILE_IMAGES_HEIGHT as height,
  PROFILE_IMAGES_WIDTH as width,
} from '@utils/constants'

import { useSnapshot } from 'valtio'
import { image } from '@context'

import * as styles from './ImageCustomizer.module.css'
import { authStore } from '../../../context'

const ImageCustomizer = () => {
  const snap = useSnapshot(image)
  const [file, setFile] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)

  const handleStoreImage = (result) => (image.result = result)

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

  const readFile = (type) => {
    reader(file).then((result) => {
      handleStoreImage(result)
    })
  }

  return (
    <div>
      <FilePicker file={file} setFile={setFile} readFile={readFile} />
      <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default ImageCustomizer
