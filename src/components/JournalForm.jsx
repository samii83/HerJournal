import { useState, useRef } from "react";
import { useJournals } from "../store/JournalContext";
import { useSettings } from "../store/SettingsContext";
import Webcam from "react-webcam";
import dayjs from "dayjs";
import DrawingCanvas from "./DrawingCanvas";

export default function JournalForm({ folderId }) {
  const { addEntry } = useJournals();
  const { editLockEnabled } = useSettings();

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [mood, setMood] = useState(5);
  const [showCamera, setShowCamera] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [drawing, setDrawing] = useState(null);

  const webcamRef = useRef();
  const mediaRecorderRef = useRef();

  const isToday = dayjs().isSame(dayjs(), "day"); // Always true for new entries
  const isEditingAllowed = !editLockEnabled || isToday;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditingAllowed) return;
    if (text.trim().length < 100) {
      alert("Write at least 100 characters!");
      return;
    }

    const entry = {
      text,
      mood,
      image,
      backgroundImage,
      folderId,
      createdAt: new Date().toISOString(),
      audio: audioBlob ? URL.createObjectURL(audioBlob) : null,
      drawing,
    };

    addEntry(folderId, entry.text, entry.mood, entry.image, entry.audio, entry.backgroundImage, entry.drawing);
    setText("");
    setImage(null);
    setBackgroundImage(null);
    setMood(5);
    setAudioBlob(null);
    setAudioURL(null);
    setShowCamera(false);
    setDrawing(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <div
        className="relative"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <textarea
          disabled={!isEditingAllowed}
          className={`w-full p-2 border rounded resize-none h-40 bg-white/80 backdrop-blur ${!isEditingAllowed ? "opacity-60 cursor-not-allowed" : ""}`}
          placeholder="Write your journal (min 100 characters)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Background Image */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">🌄 Background Image:</label>
        <input
          type="file"
          accept="image/*"
          disabled={!isEditingAllowed}
          onChange={(e) => setBackgroundImage(URL.createObjectURL(e.target.files[0]))}
        />
        {backgroundImage && (
          <img src={backgroundImage} alt="Preview" className="w-32 h-20 object-cover rounded" />
        )}
      </div>

      {/* Mood */}
      <div>
        <label className="text-sm font-medium">😊 Mood:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          disabled={!isEditingAllowed}
          onChange={(e) => setMood(Number(e.target.value))}
        />
        <div>Mood: {mood}/10</div>
      </div>

      {/* Audio */}
      <div className="space-y-2">
        <label className="text-sm font-medium">🎤 Voice Recording:</label>
        {!isRecording && (
          <button
            type="button"
            onClick={async () => {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              mediaRecorderRef.current = new MediaRecorder(stream);
              const chunks = [];

              mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
              mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                setAudioBlob(blob);
                setAudioURL(URL.createObjectURL(blob));
              };

              mediaRecorderRef.current.start();
              setIsRecording(true);
            }}
            disabled={!isEditingAllowed}
            className="px-3 py-1 bg-gray-800 text-white rounded"
          >
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            type="button"
            onClick={() => {
              mediaRecorderRef.current.stop();
              setIsRecording(false);
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Stop Recording
          </button>
        )}

        {audioURL && (
          <div>
            <audio controls src={audioURL} />
          </div>
        )}
      </div>

      {/* Drawing Canvas */}
      <div>
        <label className="text-sm font-medium">✏️ Drawing:</label>
        <DrawingCanvas value={drawing} onExport={setDrawing} />
        {drawing && (
          <img src={drawing} alt="Drawing Preview" className="mt-2 w-32 h-24 object-contain border rounded" />
        )}
      </div>

      {/* Save Button */}
      <button
        type="submit"
        disabled={!isEditingAllowed}
        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${!isEditingAllowed ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Save Journal
      </button>
    </form>
  );
}
