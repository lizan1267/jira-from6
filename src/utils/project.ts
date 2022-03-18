import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { Project } from 'screens/project-list/list';
import { useHttp } from "./http";

export const useProjects=(param?:Partial<Project>)=>{
    const client=useHttp();
    const {run,...result}=useAsync<Project[]>();

    //搜索的时候去请求数据,获取list值
    useEffect(() => {
      run(client('projects',{data:cleanObject(param || {})}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]) //当param变化的时候去请求
    return result;
}