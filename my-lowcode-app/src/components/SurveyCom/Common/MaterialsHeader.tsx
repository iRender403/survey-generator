interface MaterialsHeaderProps {
  title?: string
  desc?: string
}

export default function MaterialsHeader({ title = '这是一个标题', desc = '这是一个描述' }: MaterialsHeaderProps) {
  return (
    <div style={{ marginBottom: '15px' }}>
      {/* 标题 */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: 100,
        margin: 0,
      }}>
        {title}
      </h2>
      {/* 描述 */}
      <div style={{
        fontSize: '14px',
        color: '#606266',
        textIndent: '5px',
        marginTop: '5px'
      }}>
        {desc}
      </div>
    </div>
  )
}
