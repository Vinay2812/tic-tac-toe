import "./X.css"

const X = ({width, height, dimension}) => {
  return (
    <>
    <div className="X">
        <div className="X-left" 
            style={
                {
                    top: `${dimension/2 - height/2}px`,
                    right: `${dimension/2 - width/2}px`,
                    width: width,
                    height: height
                }  
            }
        ></div>
        <div className="X-right"
            style={{
                top: `${dimension/2 - width/2}px`,
                right: `${dimension/2 - height/2}px`,
                width: height,
                height: width
            }}
        ></div>
    </div>
    </>
  )
}

export default X
