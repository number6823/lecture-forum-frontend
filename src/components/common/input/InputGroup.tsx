
import Input from "./Input.tsx";
import type {  UseFormRegisterReturn } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { ErrorMessage, Label, StyledInputGroup } from "../group/Group.tsx";


// 우리가 만든 InputGroup이 input 태그의 확장판이다
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    errorMessage?: string;
    registerObj? : UseFormRegisterReturn;
}

function InputGroup({ label, id, errorMessage,registerObj, ...props  }: Props) {
    return (
        <StyledInputGroup>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} $hasError={!!errorMessage} {...registerObj} {...props} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </StyledInputGroup>
    );
}

export default InputGroup;
