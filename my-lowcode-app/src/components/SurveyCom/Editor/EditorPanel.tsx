export default function EditorPanel({ statues }) {
  return (
    <>
      {Object.entries(statues).map(([key, value]) =>{
        if(!(value as any).isShow){
          return null;
        }
        const Component = (value as any).editCom;
        return <Component key={key} />
      })}
    
    </>
  );
}
