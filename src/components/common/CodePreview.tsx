import { Highlight, themes } from "prism-react-renderer";

const CodePreview = ({ code }: { code: string }) => {
  return (
    <Highlight theme={themes.vsDark} code={code} language="tsx">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className="rounded-2xl overflow-auto px-3 py-2 w-full !bg-[#141414]">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex">
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodePreview;
