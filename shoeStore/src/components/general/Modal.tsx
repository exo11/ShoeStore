import { useState, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import type { ModalProps } from '@model/model'

const Modal = memo(function Modal({type = 'CUSTOM', content, children}: ModalProps) {
  
  const [show, setShow] = useState<boolean>(true)
  const ref = useRef(null)

  const onCloseWrap = (evt: React.MouseEvent) => {
    if (ref.current === evt.target) setShow(false)
  }

  const btn = (
    <button className="btn" onClick={() => setShow(false)}>
      <span>Продолжить</span>
    </button>
  )
   
  const modal = (
    <div className="modal-wrapper" ref={ref} onClick={onCloseWrap}>
      <div className="modal">
        <div className="modal-body">
          <div className="text-center">{content}</div>
        </div>
        <div className="modal-footer">
          {type === 'CUSTOM' ? children : btn}
        </div>
      </div>
    </div>
  )

  return <>{show ? createPortal(modal, document.body) : null}</>

})

export default Modal