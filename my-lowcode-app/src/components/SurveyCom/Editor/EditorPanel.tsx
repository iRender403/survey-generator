import { editorComponentMap } from '@/config/componentMap'

export default function EditorPanel({ statues }) {
  return (
    <>
      {Object.entries(statues).map(([key, value]) =>{
        if(!(value as any).isShow){
          return null;
        }
        const editorName = (value as any).name as keyof typeof editorComponentMap
        const Component = editorComponentMap[editorName]
        return Component ? <Component key={key} type={key} status={value} /> : null
      })}
    
    </>
  );
}
