import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  content?: string
  children: React.ReactNode
}

function Modal({content, children}: ModalProps) {
  
  const [show, setShow] = useState<boolean>(true)
  const ref = useRef(null)

  const onCloseWrap = (evt: React.MouseEvent) => {
    if (ref.current === evt.target) setShow(false)
  }
   
  const modal = (
    <div className="modal-wrapper" ref={ref} onClick={onCloseWrap}>
      <div className="modal">
        <div className="modal-body">
          <h3 className="text-center">{content}</h3>
        </div>
        <div className="modal-footer">
          {children}
        </div>
      </div>
    </div>
  )

  return <>{show ? createPortal(modal, document.body) : null}</>

}

export default Modal