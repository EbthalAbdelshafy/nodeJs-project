const pageSize=(page , size )=>{
    if(!page){
        page=1
    }
    if(!size){
        size=10
    }
   const skip = (page-1) * size;
    return {  skip, limit :size }  
}
const input = (searchKey, res)=>{
   let{searchKey }= ""
   res.json({message:"3333333333333",searchKey});
}



// let {page , size , ...rec}= req.query;
// console.log(rec);
// // if(!page){
// //     page=1
// // }
// // if(!size){
// //     size=10
// // }
// // const skip = (page-1) * size;
// const {skip , limit } = pageSize(page , size);
// const total = await User.count();
// const totalPage = Math.ceil(total/size );

// try {
//     const data = await User.find({...rec}).skip(skip).limit(parseInt(limit));
//     res.status(StatusCodes.OK).json({Message : "success",page ,limit,totalPage,total ,data}) 