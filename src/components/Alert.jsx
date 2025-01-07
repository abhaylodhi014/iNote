import React from 'react'

function Alert(props) {
    const captilize =(word) => {
       if(word === "danger"){
        word = "error";
       }
        const lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div  style={ {height : '45px'} }> { props.alert && <div>
      
       <div  className={`alert alert-${(props.alert.types)} alert-dismissible fade show`} role="alert" >
        <strong>{captilize(props.alert.types) +"!"}</strong> {props.alert.msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    </div>} 
    </div>
  )
}


export default Alert

//CLS = comulative layout shift ; 
//kuch external factor(like alert) ke ane per layout ka shift hona