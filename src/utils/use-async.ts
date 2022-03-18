import {useState} from 'react';

interface State<D>{
    error:Error | null;
    data:D | null;
    stat:'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState:State<null>={
    stat:'idle',
    data:null,
    error:null
}

export const useAsync=<D>(initialState?:State<D>)=>{
    const [state,setState]=useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });

    const setData=(data:D)=>setState({
        data,
        stat:'success',
        error:null
    });

    const setError=(error:Error)=>setState({
        error,
        stat:'error',
        data:null
    });

    //run用来触发异步请求
    const run=(promise:Promise<D>)=>{
        if(!promise || !promise.then){ //如果传入的不是promise或者什么都不传入的话
            throw new Error('请传入 Promise 类型数据');
        }
        setState({...state,stat:'loading'}); //先刷出loading
        return promise.then(data=>{ //成功
            setData(data);
            return data;
        }).catch(error=>{ //失败
            setError(error);
            return error;
        })
    }

    return {
        isIdle:state.stat==='idle',
        isLoading:state.stat==='loading',
        isError:state.stat==='error',
        isSuccess:state.stat==='success',
        run,
        setData,
        setError,
        ...state
    }
}