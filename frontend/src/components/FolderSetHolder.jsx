import React from 'react'
import useFolderSet from '../hooks/useFolderSet'
import { Box, Skeleton, Stack } from '@mui/material'
import SetFolder from './Cards/SetFolder'

const FolderSetHolder = ({adding,updateNumSet}) => {
  const {folderSet,deleteFolderSet,loading} = useFolderSet({adding})


  const handleDelete = (flashcardSetId)=>{
    
    deleteFolderSet(flashcardSetId)
    updateNumSet(false)
  }

  return (
    <Stack
        sx={{
          width: "100%",
          height: "100%",
          paddingTop: "20px",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: "30px",
          transition: "all 1s ease",
        }}
      >
        {loading?(
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{ height: "100px", borderRadius: "20px", margin: "10px 0" }}
          />
        </Box>
      ):folderSet?.map((flashcardSet) => (
          <SetFolder
            key={flashcardSet.flashcardSetId}
            flashcardSet={flashcardSet}
            onDelete = {handleDelete}
          />
        ))}
      </Stack>
  )
}

export default FolderSetHolder