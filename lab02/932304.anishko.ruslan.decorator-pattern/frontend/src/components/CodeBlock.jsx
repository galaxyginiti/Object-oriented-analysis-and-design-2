export default function CodeBlock({ filename, lang = 'C++', children }) {
  return (
    <div className="cc">
      <div className="cc-h">
        <span>{lang}</span>
        <span style={{ opacity: .6 }}>— {filename}</span>
      </div>
      <div className="cc-b" dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}
