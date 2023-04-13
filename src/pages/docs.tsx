import { useLocation, useClientLoaderData, useServerLoaderData } from 'umi';
import { useEffect, useState } from 'react';
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const DocsPage = () => {
  const { pathname } = useLocation();
  const clientLoaderData = useClientLoaderData();
  const serverLoaderData = useServerLoaderData();

  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    setHydrating(false);
  }, []);

  return (
    <div>
      <p id="hydrate">{pathname} {hydrating ? 'hydrating' : 'hydrated'}</p>
      <div style={{opacity: 0, height: 0, overflow: 'hidden'}}>
        <p>client loader data: {JSON.stringify(clientLoaderData)}</p>
        <p>server loader data: {JSON.stringify(serverLoaderData)}</p>

        <Form {...formItemLayout} style={{ maxWidth: 600 }}>
          <Form.Item
            label="Fail"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input placeholder="unavailable choice" id="error" />
          </Form.Item>

          <Form.Item label="Warning" validateStatus="warning">
            <Input placeholder="Warning" id="warning" prefix={<SmileOutlined />} />
          </Form.Item>

          <Form.Item
            label="Validating"
            hasFeedback
            validateStatus="validating"
            help="The information is being validated..."
          >
            <Input placeholder="I'm the content is being validated" id="validating" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <Input placeholder="I'm the content" id="success" />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning">
            <Input placeholder="Warning" id="warning2" />
          </Form.Item>

          <Form.Item
            label="Fail"
            hasFeedback
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input placeholder="unavailable choice" id="error2" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning">
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error">
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error">
            <Select placeholder="I'm Select" allowClear>
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
              <Option value="3">Option 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Validating"
            hasFeedback
            validateStatus="error"
            help="Something breaks the rule."
          >
            <Cascader placeholder="I'm Cascader" options={[{ value: 'xx', label: 'xx' }]} allowClear />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning" help="Need to be checked">
            <TreeSelect
              placeholder="I'm TreeSelect"
              treeData={[{ value: 'xx', label: 'xx' }]}
              allowClear
            />
          </Form.Item>

          <Form.Item label="inline" style={{ marginBottom: 0 }}>
            <Form.Item
              validateStatus="error"
              help="Please select right date"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <DatePicker />
            </Form.Item>
            <span
              style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
            >
        -
      </span>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              <DatePicker />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success">
            <Input allowClear placeholder="with allowClear" />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning">
            <Input.Password placeholder="with input password" />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error">
            <Input.Password allowClear placeholder="with input password and allowClear" />
          </Form.Item>

          <Form.Item label="Fail" validateStatus="error" hasFeedback>
            <Mentions />
          </Form.Item>

          <Form.Item label="Fail" validateStatus="error" hasFeedback help="Should have something">
            <Input.TextArea allowClear showCount />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};



export async function clientLoader() {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return { message: 'data from client loader of users/user2.tsx' };
}

export async function serverLoader() {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  return { message: 'data from server loader of users/user2.tsx' };
}

export default DocsPage;
