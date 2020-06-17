import React, { ChangeEvent } from 'react';
import { Input, InputGroup, InputRightAddon, useTheme } from '@chakra-ui/core';

const DataInput = (props: any) => {
    const theme = useTheme();
    const { placeholder, numberOnly, unit, content, setContent, isDisabled } = props;
    console.log(props);
    return (
        <InputGroup {...props} bg={false} >
            <Input
                _focus={{outline: "none"}}
                type="text"
                bg={props.bg || theme.colors.orange[200]}
                color={theme.colors.purple[700]}
                fontWeight={700}
                textAlign="left"
                _placeholder={{ color: theme.colors.gray[600], fontWeight: 200 }}
                placeholder={placeholder}
                size="lg"
                fontSize="5vmin"
                height="15vmin"
                marginRight={0}
                roundedRight={0}
                value={content}
                onChange={(e: ChangeEvent<any>) => {
                    const filt = (st: string) => {
                        for(let i = 0; i < st.length; i++) {
                            if(!st.charAt(i).match(/[0-9]/)) return false;
                        }
                        return true;
                    }
                    const raw = e.target.value;
                    if(numberOnly && !filt(raw)){
                        console.log('invalid string');
                        return;
                    }
                    setContent(raw);
				}}
				isDisabled={isDisabled}
            />
            <InputRightAddon
                size="lg"
                fontSize="5vmin"
				height="15vmin"
            >
                {unit}
            </InputRightAddon>
        </InputGroup>
    );
};

export default DataInput;