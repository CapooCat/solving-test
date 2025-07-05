import CodePreview from "@/components/common/CodePreview";
import { CODE } from "@/constant/code";
import { ROUTE } from "@/constant/route";
import { Col, Flex, Row, Typography } from "antd";

const PageProblemThree = () => {
  return (
    <Flex vertical className="!justify-center !items-center gap-6 opacity-0 fade-in">
      <Typography.Title className="!text-white text-center">{ROUTE.PROBLEM_3.label}</Typography.Title>

      <Typography className="!text-base w-[90%] max-w-[600px] text-center">
        Note: This can be further{" "}
        <b className="text-red-500">improved by combining filter, sort and format into a single loop</b>, since{" "}
        <b className="text-red-500">it's inefficient to have loop on each action</b> but{" "}
        <b className="text-red-500">it will be less readable and harder to maintain</b>. So I just left it as is for
        now.
      </Typography>

      <Row gutter={[20, 10]} className="w-full h-full">
        <Col xl={12} lg={24} md={24} xs={24} sm={24}>
          <CodePreview code={CODE.PROBLEM_3} />
        </Col>

        <Col xl={12} lg={24} md={24} xs={24} sm={24}>
          <CodePreview code={CODE.SOLVE_3} />
        </Col>
      </Row>
    </Flex>
  );
};

export default PageProblemThree;
