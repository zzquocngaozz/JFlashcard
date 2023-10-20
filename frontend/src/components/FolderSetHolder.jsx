import React from 'react'
import useFolderSet from '../hooks/useFolderSet'
import SetSingle from './Cards/SetSingle'
import { Stack } from '@mui/material'
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
        {folderSet?.map((flashcardSet) => (
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