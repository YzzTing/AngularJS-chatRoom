import app from './components/app';

//为所有的警告打印栈追踪。
//把所有的锚节点以注释节点显示在 DOM 中，更易于检查渲染结果的结构。
Vue.config.debug = true;

new Vue(app);
