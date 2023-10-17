import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { role } from '../../utils/regexRole';
import { Box,  Stack } from '@mui/material';
import placeholder from '../../assets/images/placeholder.png'
import {checkImg} from '../../utils/manualTesting'

// truyền vào defaultValue(optional) togglefunc updatefunc
// TODO: lam edit form
export default function KanjiDialogForm({dataInit, handleToggle, onSubmit}) {
  const {register, handleSubmit,watch,setError,clearErrors,reset, formState:{errors,isDirty}} = useForm(((!!dataInit)?{defaultValues:{...dataInit}}:{}))
  const [imgPreview,setImgPreview] = React.useState(dataInit?.imgUrl);
  const imgUrl = watch('imgUrl');

  const submitForm = async (data)=>{
    try {
        await new Promise((resolve, reject) => {
          checkImg(imgUrl, function () {
            console.log('Hình ảnh tồn tại');
            setImgPreview(imgUrl);
            clearErrors('imgUrl');
            resolve(); // Khi kiểm tra hình ảnh hoàn thành thành công
          }, function () {
            if (isDirty) {
              console.log('Hình ảnh không tồn tại');
              setImgPreview(null);
              setError('imgUrl', {
                type: 'manual',
                message: 'Hình ảnh không tồn tại'
              });
            }
            reject(); // Khi có lỗi kiểm tra hình ảnh
          });
        });
        console.log(errors?.imgUrl);
        if (!errors?.imgUrl) {
          console.log(data)
          onSubmit(data);
        }
      } catch (error) {
        // Xử lý lỗi va link imgUrl empty thì cho qua va submit
        if (imgUrl === '') {
            console.log('clear');
            clearErrors('imgUrl');
            onSubmit(data);
          }
      }
  }
// check imgUrl co load dc anh khong
  React.useEffect(()=>{
    // check neu nguoi dung co nhap url truyen vao link anh, call back neu load dc va call back neu load error
     if(!!imgUrl) checkImg(imgUrl,function() {
        console.log('Hình ảnh tồn tại');
        setImgPreview(imgUrl)
        clearErrors('imgUrl')
      },
      function() {
        if(isDirty) {
        console.log('Hình ảnh không tồn tại');
        setImgPreview(null)
        setError('imgUrl',{
            type:'manual',
            message:'Hình ảnh không tồn tại'
        })
        }
        // Thực hiện các tác vụ khi hình ảnh không tồn tại
    })
    if(imgUrl===''&& isDirty){clearErrors('imgUrl')}
    // set dependecies chi chay lai doan nay neu imgurl thay doi
    
    // reset imgPreview if click to reset btn
    if(!imgUrl){
      setImgPreview('')
    } 
  },[imgUrl])

  return (
    <>
      <Dialog open={true} sx={{'& .MuiPaper-root':{maxWidth:'calc(100vw - 100px)'}}}>
        <form noValidate onSubmit={handleSubmit(submitForm)} style={{padding:'10px 20px'}}>
          <DialogTitle>{`${!dataInit?"Tạo":"Sửa"} thẻ kanji`}</DialogTitle>
          <DialogContent sx={{width:'1000px', display:'flex', gap:'20px'}}  >
           <Stack flex={8} sx={{width:'100%', height:'100%', flexDirection:'row', justifyContent:"space-between", flexWrap:'wrap', rowGap:"20px", columnGap:"30px"}}>
             <TextField
               {...register('term',role['term'])}
               label="Thuật ngữ*"
               type="text"
               defaultValue={dataInit?.term}
               error={!!errors.term}
               helperText={errors?.term?.message}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
             <TextField
               {...register('mean',role['mean'])}
               label="Ý nghĩa*"
               type="text"
               defaultValue={dataInit?.mean}
               error={!!errors.mean}
               helperText={errors?.mean?.message}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
             <TextField
               {...register('onSound',role['nomarlRegex'])}
               label="Âm on*"
               type="text"
               defaultValue={dataInit?.onSound}
               error={!!errors.onSound}
               helperText={(!!errors.onSound)?(`Âm on ${errors?.onSound?.message}`):""}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
             <TextField
               {...register('kunSound',role['nomarlRegex'])}
               label="Âm kun*"
               type="text"
               defaultValue={dataInit?.kunSound}
               error={!!errors.kunSound}
               helperText={(!!errors.kunSound)?(`Âm kun ${errors?.kunSound?.message}`):""}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
             <TextField
               {...register('chineseSound',role['nomarlRegex'])}
               label="Hán việt*"
               type="text"
               defaultValue={dataInit?.chineseSound}
               error={!!errors.chineseSound}
               helperText={(!!errors.chineseSound)?(`Âm Hán Việt ${errors?.chineseSound?.message}`):""}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
             <TextField
               {...register('trick',role['checkLength'])}
               label="Mẹo nhớ"
               type="text"
               defaultValue={dataInit?.trick}
               error={!!errors.trick}
               helperText={(!!errors.trick)?(`Mẹo nhớ ${errors?.trick?.message}`):""}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
             <TextField
               {...register('example',role['checkLength'])}
               label="Ví dụ"
               type="text"
               defaultValue={dataInit?.example}
               error={!!errors.example}
               helperText={(!!errors.example)?(`Ví dụ ${errors?.example?.message}`):""}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
             <TextField
               {...register('exampleMean',role['checkLength'])}
               label="Nghĩa của ví dụ"
               type="text"
               defaultValue={dataInit?.exampleMean}
               error={!!errors.exampleMean}
               helperText={(!!errors.exampleMean)?(`Ví dụ ${errors?.exampleMean?.message}`):""}
               InputLabelProps={{ shrink: true }}
               variant="standard"
               sx={{width:'40%'}}
             />
           </Stack>
           <Stack flex={2} gap={2}>
           <TextField
               {...register('imgUrl',role['imgUrl'])}
               label="Link ảnh"
               type="text"
               defaultValue={dataInit?.imgUrl}
               error={!!errors.imgUrl}
               helperText={(!!errors.imgUrl)?(`${errors?.imgUrl?.message}`):""}
               InputLabelProps={{ shrink: true }}
               variant="standard"
             />
            <Box><img alt='placeholder' src={!imgPreview?placeholder:imgPreview}/></Box>
           </Stack>
          </DialogContent>
          <DialogActions>
          <Button type='button' variant='contained' onClick={()=>reset()} color='secondary' disabled={!isDirty}>Cài lại</Button>
            <Button type='button' onClick={handleToggle} variant='contained' color='error'>Huỷ</Button>
            <Button type='submit' disabled={!isDirty} variant='contained'>{!dataInit?"Tạo":"Cập nhật"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
