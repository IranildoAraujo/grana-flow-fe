import { VerboseLogs } from "../../../util/ModelProvider";

export interface MetaLLMState {
    outputText: string;
    verboseLogs: VerboseLogs | undefined;
}