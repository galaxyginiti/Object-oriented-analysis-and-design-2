export default function CodeBlock({ filename, lang = 'C#', children }) {
  return (
    <div className="cc">
      <div className="cc-h">
        <span className="cc-f">{filename}</span>
        <span className="cc-l">{lang}</span>
      </div>
      <div className="cc-b">
        <pre dangerouslySetInnerHTML={{ __html: children }} />
      </div>
    </div>
  )
}
