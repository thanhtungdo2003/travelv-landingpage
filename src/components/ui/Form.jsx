import { XIcon } from 'lucide-react'
const styledFrom = {
    margin: "auto auto",
    minWidth: "400px",
    minHeight: "200px",
    backgroundColor: "rgba(26, 26, 26, 1)",
    borderRadius: "10px",
    boxShadow: "6px 6px 6px rgba(1, 1, 1, 0.24)",
    padding: "10px"
}

function Form({ children, onClose, title, style }) {

    return (<>
        <div className="form-overlay" style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(1, 1, 1, 0.1)",
            backdropFilter: "blur(5px)",
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1000",
            display: "grid",
            alignItems: "center"
        }}>
            <div className="form-container" style={styledFrom}>
                <button style={{
                    backgroundColor: "transparent",
                    position: "absolute",
                    right: "10px",
                    top: "10px"
                }}
                    onClick={onClose}
                ><XIcon color='white' size={30} /></button>
                <div className='title' style={{
                    textAlign: "center",
                    fontSize: "20px",
                    height:"50px",
                    color:"white"
                }}>
                    {title}
                </div>
                <div style={style}>
                    {children}
                </div>
            </div>
        </div>
    </>)
}
export default Form;