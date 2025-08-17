/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useRef, useEffect} from 'react'
import {removeVideo} from '../lib/actions'
import Loader from './ModelOutput' // Was ModelOutput.jsx, now it is Loader.jsx

export default function VideoPost({video}) {
  const {id, prompt, isBusy, videoUrl, error, loadingMessage} = video
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const toggleMute = e => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  return (
    <li className="video-post">
      {isBusy && <Loader message={loadingMessage} />}
      {error && (
        <div className="error-overlay">
          <span className="icon">error</span>
          <p>Generation Failed</p>
          <p className="error-message">{error}</p>
        </div>
      )}
      {videoUrl && (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            playsInline
            muted
            className="video-player"
          />
          <div className="video-overlay">
            <div className="video-info">
              <h3>@vidgen_ai</h3>
              <p>{prompt}</p>
            </div>
            <div className="video-actions">
              <button className="action-button">
                <span className="icon">favorite</span>
                <span>Like</span>
              </button>
              <button className="action-button">
                <span className="icon">comment</span>
                <span>Comment</span>
              </button>
              <button
                className="action-button"
                onClick={() => navigator.clipboard.writeText(prompt)}
              >
                <span className="icon">share</span>
                <span>Share</span>
              </button>
              <button className="action-button" onClick={() => removeVideo(id)}>
                <span className="icon">delete</span>
                <span>Delete</span>
              </button>
              <button className="action-button" onClick={toggleMute}>
                <span className="icon">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  )
}