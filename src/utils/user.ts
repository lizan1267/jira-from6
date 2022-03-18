import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { User } from 'screens/project-list/search-panel';
import { useHttp } from "./http";

export const useUsers=(param?:Partial<User>)=>{
    const client=useHttp();
    const {run,...result}=useAsync<User[]>();

    //搜索的时候去请求数据,获取list值
    useEffect(() => {
      run(client('users',{data:cleanObject(param || {})}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]) //当param变化的时候去请求
    return result;
}