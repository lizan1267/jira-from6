import { useAuth } from 'context/auth-context';
import React from 'react';
import { Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';


// const apiUrl=process.env.REACT_APP_API_URL;

export const LoginScreen=()=>{

    const {login}=useAuth();

    //HTMLFormElement extends Element
    //表单提交

    const handleSubmit=(values:{username:string,password:string})=>{
        login(values); //调用login函数，传参数
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
                <Input type="text" placeholder={'用户名'} id={'username'} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
                <Input type="password" placeholder={'密码'} id={'password'} />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type={'primary'}>登录</LongButton>
            </Form.Item>
            
        </Form>
    )
}

