import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import CampaignIcon from "@mui/icons-material/Campaign";

const CustomTextSpeaker = ({ text, toolTitle }) => {
  const speakText = (e) => {
    e.stopPropagation();
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(
        (voice) => voice.name === "Microsoft Haruka - Japanese (Japan)"
      );
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      utterance.volume = 0.5;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("SpeechSynthesis is not supported in this browser.");
    }
  };

  return (
    <>
      <Tooltip title={toolTitle}>
        <IconButton onClick={speakText}>
          <CampaignIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CustomTextSpeaker;
