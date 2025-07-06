import { ROUTE } from "@/constant/route";
import { Button, Card, Col, Divider, Flex, Form, message, Row, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import { exchangeCurrency } from "./api/exchangeCurrency";
import type { TForm } from "./types/TForm";
import CardTitle from "./components/CardTitle";
import FormInputAmount from "./components/FormInputAmount";
import ButtonMax from "./components/ButtonMax";
import YourCurrencyWallet from "./components/YourCurrencyWallet";
import { exchangeFromWallet } from "./utils/exchangeFromWallet";
import FormSelectWalletCurrency from "./components/FormSelectWalletCurrency";
import FormSelectExchangeCurrency from "./components/FormSelectExchangeCurrency";
import FormInputExchange from "./components/FormInputExchange";
import { IconTransferVertical } from "@tabler/icons-react";

const PageProblemTwo = () => {
  const [form] = Form.useForm<TForm>();
  const [messageApi, contextHolder] = message.useMessage();

  const exchange = useMutation({
    mutationFn: exchangeCurrency,
    onSuccess: (values) => {
      form.resetFields();
      const yourCurrency = values.currency;
      const exchangeCurrency = values.currencyExchange;
      const yourWalletAfterExchange = exchangeFromWallet(
        values.yourWallet,
        yourCurrency,
        exchangeCurrency,
        values.amount
      );

      form.setFieldValue("yourWallet", yourWalletAfterExchange);
      messageApi.open({
        type: "success",
        content: "Successfully exchanged",
        style: {
          marginTop: "15svh",
        },
      });
    },
  });

  const onFinish = () => {
    const values = form.getFieldsValue(true);
    exchange.mutate(values);
  };

  const initialValues: TForm = {
    yourWallet: [{ price: 100, currency: "USD" }],
  };

  return (
    <Flex vertical className="!justify-center !items-center gap-6 opacity-0 fade-in">
      <Typography.Title className="!text-white text-center">{ROUTE.PROBLEM_2.label}</Typography.Title>
      {contextHolder}

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        onSubmitCapture={(e) => e.preventDefault()}
        className="w-[90%] max-w-[800px]"
      >
        <Card title={<CardTitle />} classNames={{ body: "!p-0" }} className="!rounded-2xl">
          <Row>
            <Col md={16} sm={24} xs={24}>
              <Row gutter={[10, 16]} className="p-6">
                <Col span={24}>
                  <Form.Item<TForm>
                    label="Your Currency"
                    name="currency"
                    rules={[{ required: true, message: "Please select your currency" }]}
                  >
                    <FormSelectWalletCurrency />
                  </Form.Item>
                </Col>

                <Col span={20}>
                  <FormInputAmount />
                </Col>

                <Col span={4}>
                  <ButtonMax />
                </Col>

                <Col span={24}>
                  <Flex className="justify-center">
                    <Divider className="!my-2" />
                    <IconTransferVertical className="bg-black p-2 size-10 rounded-full absolute self-center justify-self-center" />
                  </Flex>
                </Col>

                <Col span={24}>
                  <Form.Item<TForm>
                    label="Exchange Currency"
                    rules={[{ required: true, message: "Please select exchange currency" }]}
                    name="currencyExchange"
                  >
                    <FormSelectExchangeCurrency />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <FormInputExchange />
                </Col>

                <Col span={24} className="!flex gap-2.5 mt-2">
                  <Button type="primary" onClick={() => form.submit()} loading={exchange.isPending}>
                    Exchange
                  </Button>

                  <Button
                    type="default"
                    onClick={() => form.resetFields(["amount", "amountExchange", "currency", "currencyExchange"])}
                    disabled={exchange.isPending}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col md={8} sm={24} xs={24}>
              <Flex className="sm:border-l !px-6 !border-[#303030] gap-2 sm:!px-4 !py-2 h-full " vertical>
                <YourCurrencyWallet />
              </Flex>
            </Col>
          </Row>
        </Card>
      </Form>
    </Flex>
  );
};

export default PageProblemTwo;
