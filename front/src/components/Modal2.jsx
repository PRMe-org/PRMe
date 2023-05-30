import React from 'react';

const Modal2 = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section> 
          <main>{props.children}</main>
          <footer>
            <div className='modal2-buttons'>
              <button id='modal-close' onClick={close}>
                확인
              </button>
              <button id='modal-close' onClick={close}>
                취소
              </button>
            </div>
          </footer>
        </section>
      ) : null}
    </div>

  )
}

export default Modal2