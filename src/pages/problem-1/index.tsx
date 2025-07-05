import CodePreview from "@/components/common/CodePreview";
import { CODE } from "../../constant/code";
import { Col, Form, InputNumber, Row, Typography } from "antd";
import { ROUTE } from "@/constant/route";
import CodeLogs from "@/components/common/CodeLogs";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./solution";

const PageProblemOne = () => {
  const [form] = Form.useForm();

  const initialValues = { input: 10 };

  return (
    <Form
      className="flex flex-col justify-center items-center gap-2 opacity-0 fade-in"
      form={form}
      initialValues={initialValues}
      layout="vertical"
    >
      <Typography.Title className="!text-white">{ROUTE.PROBLEM_1.label}</Typography.Title>

      <Typography>Input</Typography>
      <Form.Item name="input">
        <InputNumber />
      </Form.Item>

      <Row gutter={[20, 10]} className="w-full h-full">
        <Col xl={12} lg={24} md={24} xs={24} sm={24}>
          <CodePreview code={CODE.PROBLEM_1} />
        </Col>

        <Col xl={12} lg={24} md={24} xs={24} sm={24}>
          <Form.Item shouldUpdate={(prev, cur) => prev.input !== cur.input} noStyle>
            {(form) => {
              const value = form.getFieldValue("input");

              return (
                <CodeLogs
                  logs={[
                    `sum_to_n_a(${value}) => (${sum_to_n_a(value)})`,
                    `sum_to_n_b(${value}) => (${sum_to_n_b(value)})`,
                    `sum_to_n_c(${value}) => (${sum_to_n_c(value)})`,
                  ]}
                />
              );
            }}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PageProblemOne;
