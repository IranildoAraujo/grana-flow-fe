import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { updateError, updateInputText, updateLoading, updateOnClick } from "../../../../store/slices/chatInput";
import "./styles.css";

const ChatInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state) => state.chatInputStore);

  const handleSubmit = () => {
    if (input || input.trim() !== "") {
      dispatch(updateError("")); 
      dispatch(updateInputText(input))
      dispatch(updateOnClick(true));
      dispatch(updateLoading(true));
    }
  }

  return (
      <div className="chat-input">
        <div className="textarea-container">
        <textarea
          rows={6}
          placeholder="Digite sua mensagem..."
          className="textarea"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {handleSubmit()}}
          disabled={loading}
          className={`send-button ${loading ? "button-disabled" : ""}`}
        >
          {loading && <span className="loading-spinner"></span>}
        </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
  );
};
export default ChatInput;