import React from 'react';
import { useState } from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import { List } from './list';
import { SearchPanel } from './search-panel';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

export const ProjectListScreen=()=>{
    //当用户输入关键词或者选择select框的时候，param变
    const [param, setParam] = useState({
        name:"",
        personId:""
    }); 

    const debounceParam=useDebounce(param,200);

    const {isLoading,error,data:list}=useProjects(debounceParam);

    const {data:users}=useUsers();

    // false就是说，在我离开这个页面之后，把标题还原为原来的标题
    useDocumentTitle('项目列表',false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error?<Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
}

const Container=styled.div`
  padding:3.2rem;
`

