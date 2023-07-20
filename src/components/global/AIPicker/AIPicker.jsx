import React from 'react'

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div>
      <textarea
        placeholder="Pregutale a una IA..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div>
        {generatingImg ? (
          <button type="outlined" title="Generando..." />
        ) : (
          <>
            <button
              type="outlined"
              title="AI Logo"
              onClick={() => handleSubmit('logo')}
            >
              Logo
            </button>
            <button
              type="outlined"
              title="AI Full"
              onClick={() => handleSubmit('full')}
            >
              Full
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker
