## 基础窗口部分

使用PyUIC编译出来的文件为，使用布局文件生成的ui初始化代码，所以主类直接继承这个类，然后在init方法中执行相关初始化代码即可，由于PyUIC编译出来的代码仅仅是ui初始化代码，没有继承QMainWindow类，所以需要自己进行继承，因此主类继承ui类以及QMainWindow就可以了

ui类中只有两个方法，setupUi 初始化ui布局、retranslateUi将所有控件的文案编码处理为utf-8，顺带进行默认的槽函数绑定connectSlotsByName，除此之外没有别的东西了

栗子：

    # 编译后的ui代码

    # -*- coding: utf-8 -*-

    # Form implementation generated from reading ui file 'MainWin.ui'
    #
    # Created by: PyQt5 UI code generator 5.13.0
    #
    # WARNING! All changes made in this file will be lost!

    from PyQt5 import QtCore, QtGui, QtWidgets

    class Ui_MainWindow(object):
        def setupUi(self, MainWindow):
            MainWindow.setObjectName("MainWindow")
            MainWindow.resize(564, 322)
            self.centralwidget = QtWidgets.QWidget(MainWindow)
            self.centralwidget.setObjectName("centralwidget")
            self.horizontalLayoutWidget = QtWidgets.QWidget(self.centralwidget)
            self.horizontalLayoutWidget.setGeometry(QtCore.QRect(10, 10, 541, 41))
            self.horizontalLayoutWidget.setObjectName("horizontalLayoutWidget")
            self.horizontalLayout = QtWidgets.QHBoxLayout(self.horizontalLayoutWidget)
            self.horizontalLayout.setContentsMargins(0, 0, 0, 0)
            self.horizontalLayout.setObjectName("horizontalLayout")
            self.label = QtWidgets.QLabel(self.horizontalLayoutWidget)
            self.label.setObjectName("label")
            self.horizontalLayout.addWidget(self.label)
            self.lineEdit = QtWidgets.QLineEdit(self.horizontalLayoutWidget)
            self.lineEdit.setObjectName("lineEdit")
            self.horizontalLayout.addWidget(self.lineEdit)
            self.pushButton_2 = QtWidgets.QPushButton(self.horizontalLayoutWidget)
            self.pushButton_2.setObjectName("pushButton_2")
            self.horizontalLayout.addWidget(self.pushButton_2)
            self.pushButton = QtWidgets.QPushButton(self.horizontalLayoutWidget)
            self.pushButton.setObjectName("pushButton")
            self.horizontalLayout.addWidget(self.pushButton)
            self.pushButton.raise_()
            self.label.raise_()
            self.pushButton_2.raise_()
            self.lineEdit.raise_()
            MainWindow.setCentralWidget(self.centralwidget)
            self.menubar = QtWidgets.QMenuBar(MainWindow)
            self.menubar.setGeometry(QtCore.QRect(0, 0, 564, 22))
            self.menubar.setObjectName("menubar")
            MainWindow.setMenuBar(self.menubar)
            self.statusbar = QtWidgets.QStatusBar(MainWindow)
            self.statusbar.setObjectName("statusbar")
            MainWindow.setStatusBar(self.statusbar)

            self.retranslateUi(MainWindow)
            QtCore.QMetaObject.connectSlotsByName(MainWindow)

        def retranslateUi(self, MainWindow):
            _translate = QtCore.QCoreApplication.translate
            MainWindow.setWindowTitle(_translate("MainWindow", "测试响应函数编写"))
            self.label.setText(_translate("MainWindow", "url："))
            self.pushButton_2.setText(_translate("MainWindow", "提交"))
            self.pushButton.setText(_translate("MainWindow", "清除"))


    # 主类代码
    import sys
    from PyQt5.QtWidgets import QMainWindow
    from PyQt5.QtWidgets import QApplication, QMainWindow
    from ui import MainWin

    # 继承 QMainWindow，ui类中只有两个方法，
    class MainWindow(MainWin.Ui_MainWindow, QMainWindow):

        def __init__(self, parent=None):
            QMainWindow.__init__(self, parent)
            self.setupUi(self)
            self.retranslateUi(self)
            # self.pushButton.clicked.connect(self.onClearBtnClick)
            self.pushButton_2.clicked.connect(self.onSubmitBtnClick)
            print('init')

        def onSubmitBtnClick(self):
            print('submit')

        def on_pushButton_clicked(self):
            print('clear')


    if __name__ == '__main__':
        app = QApplication(sys.argv)
        mainWindow = MainWindow()
        mainWindow.show()

        sys.exit(app.exec_())


## 槽函数绑定

槽函数绑定有两种方式：

#### 通过调用静态方法进行默认绑定

    Core.QMetaObject.connectSlotsByName(MainWindow)

这会将所有已经声明的ui控件绑定到满足约定的命名规则的处理函数上，约定的规则为：on_ + 控件名称 + _信号名称，注意下划线。例如：

    # 声明了btn
    self.pushButton_2 = QtWidgets.QPushButton(self.horizontalLayoutWidget)
    self.pushButton_2.setObjectName("pushButton_2")

    # 对应的click绑定函数：
    def on_pushButton_2_clicked(self):
    # dosoming...


#### 手动绑定

通过调用控件实例对应信号伤的connect进行绑定

栗子：

    self.pushButton_2.clicked.connect(self.onSubmitBtnClick)
    self.lineEdit.textChanged.connect(self.onLineEditChange)

## 编码问题

编码问题主要出现在python 2.x的版本，python 3系统默认编码为utf-8编码不需要进行处理

python 2.x的处理方式：

    #! /usr/bin/env python 
    # -*- coding: utf-8 -*- 
    import sys 
    reload(sys) # Python2.5 初始化后删除了 sys.setdefaultencoding 方法，我们需要重新载入 
    sys.setdefaultencoding('utf-8') 



## 依赖相关

2.7默认py的包管理工具时pip

3+ 使用的是pip3 包管理工具，安装依赖时使用对应的管理工具进行


## 虚拟环境

pyCharm在新建项目的时候会根据系统环境建立项目级的虚拟py运行时环境，最好不要使用这个环境，而使用system级别的环境进行，不然打包可能会出现问题


## 弹层提示

    QMessageBox.warning(self, 'warning', 'warning', QMessageBox.Yes | QMessageBox.No,
                            QMessageBox.No)



## 主程载体代码段

    if __name__ == '__main__':
        app = QApplication(sys.argv)
        mainWindow = MainWindow()
        mainWindow.show()

        sys.exit(app.exec_())


