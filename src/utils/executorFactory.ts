import PythonExecutor from "../containers/pythonExecutor";
import JavaExecutor from "../containers/runJavaDocker";
import CodeExecutorStrategy from "../types/codeExecutorStrategy";

export default function createExecutor(codeLanguage: string) : CodeExecutorStrategy | null {

    if(codeLanguage === "PYTHON"){
        return new PythonExecutor();
    } else if(codeLanguage === "JAVA"){
        return new JavaExecutor();
    }else {
        return null;
    }
}