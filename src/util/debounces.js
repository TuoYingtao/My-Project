export default {
    /**
     * @param fun { function } 执行函数
     * @param delay(50) { Number } 延迟时间 单位：默认 50 毫秒
     * @param isImmediate(true) { Boolean } debounce 会在 delay 时间间隔的开始时立即调用这个函数
     * @return function 返回一个函数
     */
    debounce(fun,delay=50,isImmediate){
        /** 创建一个定时器 */
        let timer = null;

        /** 
         * 将 debounce 处理结果当作函数返回
         * 触发事件回调时执行这个返回函数
         */
        return function(...args){

            /** 判断如果 timer 定时器已经设定过就清空上一次的定时器 */
            if(timer) clearTimeout(timer);

            /** 
             * immediate 为 true 表示第一次触发后执行 
             * timer 为空表示首次触发
             */
            if(isImmediate && !timer) fun.apply(this,...args);
            
            /** 开始设定一个新的定时器，定时器结束后执行传入的函数 fun */
            timer = setTimeout(() => {
                fun.apply(this,...args)
            },delay)
        }
    }
}