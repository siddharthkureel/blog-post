export const validate =(data)=>{
   let result=[true,''];
    if (data.validation.email) {
        console.log('vsd');
        let valid = /\S+@\S+\.\S+/.test(data.value);
        if (!valid) {
            result = [false, 'email is not valid']
        }
    }
   if(data.validation.minLength){
       if (data.value.length < data.validation.minLength){
           result = [false, `min length is ${data.validation.minLength}`]
       }
   }
    if (data.validation.required) {
        if (data.value.trim() === '') {
             result = [false, 'this field is required']
        }
    }
    
    return result;
}
