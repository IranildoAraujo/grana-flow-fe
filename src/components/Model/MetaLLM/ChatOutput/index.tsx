import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../../store/hooks";
import './styles.css';

const ChatOutPut: React.FC = () => {

    const { outputText, verboseLogs } = useAppSelector((state) => state.metaLLMStore);

    return (
        <div>
            <h2>Modelo:</h2>
            <div className="chat-output">
                <pre>{outputText}</pre>
            </div>
            {
                verboseLogs && (
                    <div className="verbose-logs">
                        <h3>Verbose Logs:</h3>
                        <pre>{JSON.stringify(verboseLogs, null, 2)}</pre>
                    </div>
                )
            }
        </div>
    );
}

export default ChatOutPut;