## 信号绑定方式

一般采用默认的约定行事绑定槽函数：

    QtCore.QMetaObject.connectSlotsByName(MainWindow)

槽函数约定规则：

    on_ + 控件控件类名 + _信号名称（如：_clicked）

    栗子： on_submitBtn_clicked

注意：一定要使用装饰器进行装饰，不然槽函数接受到信号后会被激发两次

    @pyqtSlot("") # pyqtSlot位于QtCore中

## 第二种绑定方式

可以使用connect进行手动绑定

    self.closeButton.clicked.connect(self.onCloseBtnClick)

在某些场景下可能会使用，大部分行情况下都会使用约定的绑定形式进行绑定，在有大量组件的页面中使用connect进行绑定是很不明智的