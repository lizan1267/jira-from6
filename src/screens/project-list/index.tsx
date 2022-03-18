import React from 'react';
import { useState, useEffect } from 'react';
// import * as qs from 'qs';
import { cleanObject, useDebounce, useMount } from 'utils';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';


// const apiUrl=process.env.REACT_APP_API_URL

export const ProjectListScreen=()=>{
    //负责人
    const [users, setUsers] = useState([]);

    //当用户输入关键词或者选择select框的时候，param变
    const [param, setParam] = useState({
        name:"",
        personId:""
    }); 

    const debounceParam=useDebounce(param,200);

    //状态
    const [list, setList]=useState([]);

    const client=useHttp();

    //搜索的时候去请求数据,获取list值
    useEffect(() => {
      client('projects',{data:cleanObject(debounceParam)}).then(setList)
    }, [debounceParam]) //当param变化的时候去请求

    //初始化users
    useMount(()=>{
      client('users').then(setUsers)
    })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
}

const Container=styled.div`
  padding:3.2rem;
`

