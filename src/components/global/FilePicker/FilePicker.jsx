import React from 'react'

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div>
      <div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload">Subir imagen</label>
        <p>{file === '' ? 'Sin imagen seleccionada' : file.name}</p>
      </div>
      <div>
        <button type="outlined" title="Logo" onClick={() => readFile('logo')}>
          Logo
        </button>
        <button type="filled" title="Full" onClick={() => readFile('full')}>
          Full
        </button>
      </div>
    </div>
  )
}

export default FilePicker
