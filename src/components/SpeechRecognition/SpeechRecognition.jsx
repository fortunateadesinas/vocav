import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {IconMicrophone} from '@tabler/icons-react';

/**
 * A React functional component that renders a microphone icon that toggles the speech recognition feature on and off.
 * The component uses the useSpeechRecognition hook to get the current transcript and listening state.
 * The component also uses the useEffect hook to update the source text when the transcript changes.
 * The component also uses the SpeechRecognition.startListening and stopListening methods to handle voice recording.
 * The component renders a microphone icon that is grayed out when the speech recognition feature is not listening and is black when it is listening.
 */
const SpeechRecognitionComponent = ({ setSourceText }) => {

    const { transcript, listening } = useSpeechRecognition();

    useEffect(() => {
        setSourceText(transcript);
    }, [transcript, setSourceText]);

    const handlingVoiceRecording = () => {
        if (!listening) {
            SpeechRecognition.startListening({ continuous: true });
        } else {
            SpeechRecognition.stopListening();
        }
    }

    return (
        <div>
            <IconMicrophone size={22} className="text-gray-400" onClick={handlingVoiceRecording} />
        </div>
    )
}

export default SpeechRecognitionComponent;