import React, { useState, KeyboardEvent } from 'react'


interface IProps {
    chat: (v: any) => void,
    myName: string
}

export default function ChattingBox({ chat, myName }: IProps) {
    const [value, setValue] = useState("");

    const handleChangeValue = (v: string) => {
        setValue(v)
    }
    const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && e.shiftKey === false) {
            const _value = value.trim();
            if (_value) {
                chat({ name: myName, content: _value, data: Date.now() })
                setValue("");
            }
        }
    }
    return (
        <div className='form'>
            <textarea value={value} onChange={(t) => handleChangeValue(t.target.value)}
                onKeyDown={handleEnter}
            ></textarea>
        </div>
    )
}
