import React from 'react';

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section> 
          <main>{props.children}</main>
          <footer>
            <button id='modal-close' onClick={close}>
              확인
            </button>
          </footer>
        </section>
      ) : null}
    </div>

  )
}

export default Modal