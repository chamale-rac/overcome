import React from 'react'
import { Button } from '@components/global'
import * as styles from './AIPicker.module.css'

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className={styles.container}>
      <textarea
        placeholder="Ask to the AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className={styles.buttonWrapper}>
        <Button
          customStyles="mb-2 mt-1 text-xs"
          onClick={handleSubmit}
          disabled={prompt === '' || generatingImg}
        >
          {generatingImg ? 'Generating...' : 'Ask! ✨'}
        </Button>
      </div>
    </div>
  )
}

export default AIPicker
