
const checkStr = (str) =>{
    let arr = str.split(' ')

    let res = arr.filter( el =>{
        if(el !== ''){
            return true
        }
    })

    if(res.length > 0){
        return true
    }
    else{
        return false
    }
}

export default checkStr
