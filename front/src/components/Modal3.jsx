import React from 'react';

const Modal3 = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section> 
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>

  )
}

export default Modal3