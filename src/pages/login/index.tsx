import { useEffect,  type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, App } from "antd";
import { useRequest, useUpdateEffect } from "ahooks";
import { loginService, type LoginData } from "./service";

const Login: FC = () => {
  /* hooks区 */
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  /* 计算值区 */

  /* (请求)api区 */
  const { data: verifycode, run: refreshVerifycode } = useRequest(
    loginService.verifycode,
    {
      manual: true,
    }
  );
  const { data: loginRes, run: runLogin } = useRequest(loginService.login, {
    manual: true,
  });

  /* useEffect区 */
  useEffect(() => {
    refreshVerifycode();
  }, [refreshVerifycode]);

  useUpdateEffect(() => {
    if (loginRes?.data.code === 200) {
      message.success("登录成功！");
      navigate("/abc");
    } else {
      refreshVerifycode();
      form.resetFields();
      message.error(loginRes?.data.data);
    }
  }, [loginRes]);
  /* handle区 */
  const onFinish = (values: LoginData) =>
    runLogin({ ...values, no: verifycode ? verifycode.data.data.no : "" });
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  /* return区 */
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<LoginData>
        label="用户名"
        name="adminName"
        rules={[{ required: true, message: "请输入用户名！" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginData>
        label="密码"
        name="adminPwd"
        rules={[{ required: true, message: "请输入密码！" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<LoginData>
        label="验证码"
        name="verifyCode"
        rules={[{ required: true, message: "请输入验证码" }]}
      >
        <Input />
      </Form.Item>

      <div
        onClick={refreshVerifycode}
        dangerouslySetInnerHTML={{
          __html: verifycode ? verifycode.data.data.svg : "",
        }}
      />

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
