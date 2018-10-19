前言：根据最近学习的课程，简单总结一下学习到的css左右布局以及居中方案。后期学习深入之后再回来进行css居中的完整总结。
<!--more-->
### 1.水平居中
#### 1.1内联元素水平居中
将内联元素外部的块级元素的`text-align`设置为`center`，即可实现内联元素（`inline`、`inline-block`）的水平居中。
[演示](http://js.jirengu.com/riqof/1/edit?html,css,output)

#### 1.2块级元素水平居中
将固定宽度的块级元素的`margin-left`和`margin-right`设置为`auto`，即可实现块级元素的水平居中。
[演示](http://js.jirengu.com/riqof/2/edit?html,css,output)

#### 1.3多个块级元素水平居中
将每个块级元素的`display`设置为`inline-block`，然后将它们的父容器的`text-align`设置为`center`，即可使多个块级元素水平居中。
[演示](http://js.jirengu.com/siyun/edit?html,css,output)

### 2.垂直居中
#### 2.1内联元素垂直居中
设置内联元素的行高（`line-heigt`）和内联元素的父元素的高度（`height`）相等，且内联元素的字体大小远小于行高，即可使内联元素垂直居中。
[演示](http://js.jirengu.com/tizir/edit?html,css,output)
#### 2.2块级元素垂直居中
##### 2.2.1固定高度的块级元素
通过绝对定位元素距离顶部50%，并设置margin-top向上偏移元素高度的一半，即可实现垂直居中。
[演示](http://js.jirengu.com/hemav/1/edit?html,css,output)
##### 2.2.2未知高度的块级元素
借助CSS3中的transform属性向Y轴反向偏移50%的方法实现垂直居中
[演示](http://js.jirengu.com/tucah/1/edit?html,css,output)
