const langugeSupport = ['en', 'vi'];
const defaultLanguge = 'en';
const getcurrentLanguge = () => {
    const tmp = localStorage.getItem("locale");
    const currentLanguge = tmp == null ? defaultLanguge : tmp;
    return langugeSupport.some((item,index)=>{
        return item == currentLanguge;
    })?currentLanguge:defaultLanguge;
}
export default getcurrentLanguge;