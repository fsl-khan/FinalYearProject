import React from 'react'

const BookView = ({pdfUrl}) => {
  return (
    <div className="pdf-container">
    <iframe src={pdfUrl} title="PDF Viewer" style={{ width: '100%', height: '50vh' }}></iframe>
      </div>
  )
}

export default BookView
