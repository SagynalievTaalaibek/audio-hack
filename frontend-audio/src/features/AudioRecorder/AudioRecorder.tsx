import React, { useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { parseText } from './audioThunks.ts';
import { selectText } from './audioSlice.ts';

const AudioRecorder: React.FC = () => {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const parsedText = useAppSelector(selectText);

  console.log(parsedText);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioBlob(file);
    }
  };

  const handlePlayback = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      if (audioRef.current) {
        audioRef.current.src = audioURL;
        audioRef.current.play();
      }
    }
  };

  const onParseText = async () => {
    if (!audioBlob) return;
    console.log(audioBlob);
    dispatch(parseText(audioBlob)); // Отправляем аудио на сервер
  };

  return (
    <div>
      <input type="file" accept="audio/!*" onChange={handleFileChange} />
      <button onClick={handlePlayback} disabled={!audioBlob}>
        Воспроизвести запись
      </button>
      <audio ref={audioRef} controls style={{ display: 'block', marginTop: '10px' }} />
      <Button variant={'contained'} onClick={onParseText}>Send audio</Button>
      <Box sx={{mt: 2}}>
        <Typography variant="h4" component={'div'}>Parsed text</Typography>
        <Typography variant="h6" component={'p'}>{parsedText?.text}</Typography>
      </Box>
    </div>
  );
};

export default AudioRecorder;





