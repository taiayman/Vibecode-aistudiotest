/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {memo} from 'react'

function Loader({message}) {
  return (
    <div className="loader-container">
      <div className="spinner">
        <span className="icon">progress_activity</span>
      </div>
      <p className="loader-message">{message}</p>
      <div className="loader-tip">
        <p>
          <span className="icon">timer</span> Video generation can take several
          minutes. Please be patient.
        </p>
      </div>
    </div>
  )
}

export default memo(Loader)
