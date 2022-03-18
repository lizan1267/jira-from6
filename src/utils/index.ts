import { useState, useEffect } from "react";

//专门判断0的
export const isFalsy=(value:unknown)=>value === 0 ? false : !value ;

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject=(object:object)=>{
    const result={...object}; //相当于 Object.assign({},object)
    Object.keys(result).forEach(key=>{
        //@ts-ignore
        const value=result[key];
        if(isFalsy(value)){  //0不删除
            //@ts-ignore
            delete result[key];
        }
    })
    return result;
};

//自定义hook
export const useMount=(callback:()=>void)=>{
    useEffect(()=>{
        callback()
    },[])
};

// 封装debounce,就是去抖
// const debounce=(func,delay)=>{
//     let timeout;
//     return (...param)=>{
//         if(timeout){
//             clearTimeout(timeout);
//         }
//         timeout=setTimeout(function(){
//             func(...param);
//         },delay);
//     }
// }

//对上边封装的再一次精简
//后面用泛型来规范类型
export const useDebounce=<V>(value:V,delay?:number)=>{
    //定义一个内部变量debounceValue
    const [debounceValue,setDebounceValue]=useState(value);
    
    useEffect(()=>{
        //在value和delay变化时，都去新设置一个定时器，去改变debounceValue的值
        const timeout=setTimeout(()=>{
            setDebounceValue(value)
        },delay);
        //每次在上一个useEffect处理完以后再运行，做一些处理性的工作
        return ()=>clearTimeout(timeout);
    },[value,delay]); 

    return debounceValue;
}