import React, { useCallback, useState } from 'react'

import { Box, Button, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import BackdropLoading from './FeedBack/BackdropLoading'
import searhbanner from '../assets/images/searhbanner.png'
import KanjiDialogForm from './Dialog/KanjiDialogForm';
import KanjiCardEdit from './Cards/KanjiCardEdit';
// TODO: create hook get list kanji
const KanjiCardEditContainer = () =>{
    const [data,setData] = useState([{
      cardKanjiId: 1,
      onSound: "そく",
      kunSound: "あし",
      chineseSound: "Túc",
      term: "足",
      hint: 'Chân(足) không đủ(不足) dài để chạy',
      mean: "Đầy đủ, chân",
      example: "1万円じゃ不足よ",
      exampleMean: "1 man là không đủ đâu",
      imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
      flashcardSetId: 123
  },{
    cardKanjiId: 2,
    onSound: "そく",
    kunSound: "あし",
    chineseSound: "Túc",
    hint: 'Chân(足) không đủ(不足) dài để chạy',
    term: "足",
    mean: "Đầy đủ, chân",
    example: "1万円じゃ不足よ",
    exampleMean: "1 man là không đủ đâu",
    imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
    flashcardSetId: 123
  },
  {
    cardKanjiId: 2,
    onSound: "そく",
    kunSound: "あし",
    chineseSound: "Túc",
    hint: 'Chân(足) không đủ(不足) dài để chạy',
    term: "足",
    mean: "Đầy đủ, chân",
    example: "1万円じゃ不足よ",
    exampleMean: "1 man là không đủ đâu",
    imgUrl: "https://tuhoconline.net/wp-content/uploads/141-Ashi.jpg",
    flashcardSetId: 123
  }
  
  ])
    const [loading,setLoading] = useState(false)
    const [openForm,setOpenForm] = useState(false)
  
    const handleToggleForm = useCallback(()=>{
      setOpenForm(!openForm)
      console.log("toggle")
    },[openForm])
  
    console.log(!data)
    return (
      <Stack>
        { 
          (loading)?
            <BackdropLoading/>
          :
          (data.length === 0)?
            <Stack minHeight={150} justifyContent={'center'} alignItems={'center'}>
              <Box width={70} height={70}>
                <img src={searhbanner} loading='lazy' alt='notfound' style={{width:"100%", height:"100%",objectFit:'cover', objectPosition:"center"}}/>
              </Box>
              <Typography textAlign={"center"}>Chưa có thẻ nào trong bộ của bạn</Typography>
            </Stack>
          :
            data.map((card,index)=>
              (<KanjiCardEdit key={index} index={index} card={card}/>)
            )
        }
        <Button startIcon={<AddIcon/>} variant='contained' sx={{borderRadius:"15px"}} onClick={handleToggleForm}>Thêm thẻ hán tự</Button>
        {openForm?<KanjiDialogForm handleToggle={handleToggleForm} onSubmit={(data)=>{console.log(data)}} />:""}
      </Stack>
      )
}

export default KanjiCardEditContainer