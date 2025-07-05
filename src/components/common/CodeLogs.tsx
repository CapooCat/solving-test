import { Flex, Typography } from "antd";

type TProps = {
  logs: string[];
};

const CodeLogs = ({ logs }: TProps) => {
  return (
    <Flex vertical className="w-full rounded-2xl !p-4 h-full" style={{ backgroundColor: "#141414" }}>
      {logs.map((log, index) => (
        <Typography key={index}>{log}</Typography>
      ))}
    </Flex>
  );
};

export default CodeLogs;
