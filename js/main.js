var move = {
  el: document.querySelector('#wrap'),
  startY: 0,                    // 手刚按下的位置
  diffY: 0,                     // 移动后的位置差
  currentY: 0,                 // 当前停留的位置(transform值)
  endY: document.querySelector('#app').offsetHeight - document.querySelector('#wrap').offsetHeight,  // 终点值
  go: document.querySelector('#app').offsetHeight,     // 一次移动的距离(刚好#app元素的高度)
  // 添加事件
  addEvent(type, element) {
    // tpye: 事件类型;  element: 目标元素
    switch (type) {
      case 'touchstart':
        element.addEventListener(type, this.handleToStart);
        break;
      case 'touchmove':
        element.addEventListener(type, this.handleToMove);
        break;
      case 'touchend':
        element.addEventListener(type, this.handleToEnd);
        break;
      default:
        console.log('添加事件类型超出能力范围');
        break;
    }
    return this;
  },

  // 手指按下
  handleToStart(e) {
    move.startY = e.touches[0].pageY * 1;             // 获取点击时坐标 y
    // console.log(move.el.style.transform)
    const s = move.el.style.transform.split('(')[1];
    const length = s.length;
    // console.log(s.slice(0, length -3));
    move.currentY = s.slice(0, length -3) * 1;           // 获取当前停留位置(transform值)
    return this;
  },
  
  // 手指滑动
  handleToMove(e) {
    const pageY = e.touches[0].pageY * 1;
    move.diffY = pageY - move.startY;

    // 如果当前在基础位置，'box'不能向下移动
    if ((move.currentY === 0 && move.diffY > 0) || (move.currentY === move.endY && move.diffY < 0)) {
      return;
    }

    // 根据手指移动的情况做出：向上 or 向下
    // 先关闭过渡效果
    move.el.style.transition = '';
    move.el.style.transform = 'translateY(' + (move.currentY + move.diffY + 'px') + ')';

    return this;
  },
  
  // 手指离开
  handleToEnd(e) {
    // 手指离开时：超过100就滑动元素 or 回到原来位置
    const pageY = e.changedTouches[0].pageY * 1;
    move.diffY = pageY - move.startY;
    const diffY = Math.abs(move.diffY);
    let go = 0;

    move.diffY > 0 ? go = move.go : go = -move.go;


    if ((move.currentY === 0 && move.diffY > 0) || (move.currentY === move.endY && move.diffY < 0)) {
      return;
    }
    // 手指离开：移动 or 回原地方
    // 开启过渡效果
    move.el.style.transition = 'all .5s';
    diffY > 100 ? move.el.style.transform = 'translateY(' + (move.currentY +  go) + 'px' + ')' : move.el.style.transform = 'translateY(' + move.currentY + 'px' + ')';
  }
}




window.onload = function () {
    // 获取父元素
    const wrap = document.querySelector('#app');
    console.log(wrap);

    // 添加start、move、end事件
    move.addEvent('touchstart', wrap)
      .addEvent('touchmove', wrap)
      .addEvent('touchend', wrap);
}