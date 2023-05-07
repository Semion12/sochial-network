import multer from "multer";

multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'images/')
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString()+'-'+file.originalname)
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb)=>{
    if (types.includes(file.minetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }

}

export default upload({storage, fileFilter})