import React, {useState} from "react";


export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('asdsa12d');
        setValue(e.target.value)
    }

    return {
        value, onChange
    }
}