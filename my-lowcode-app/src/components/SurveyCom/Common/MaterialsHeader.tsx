export default function MaterialsHeader(props: any) {
  const { title, desc, options, position, titleSize, descSize, titleWeight, descWeight, titleItalic, descItalic, titleColor, descColor } = props;
  return (
    <div style={{ marginBottom: '15px' }}>
      {/* 标题 */}
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 100,
          margin: 0,
        }}
      >
        {title||'无标题'}
      </h2>
      {/* 描述 */}
      <div
        style={{
          fontSize: '14px',
          color: '#606266',
          textIndent: '5px',
          marginTop: '5px',
        }}
      >
        {desc||'无描述'}
      </div>
    </div>
  );
}
