import React, { ChangeEvent } from 'react';
import { Box, Input, InputGroup, InputRightAddon, Stack, useTheme, Heading } from '@chakra-ui/core';
import recoil from 'recoil';
const { atom, useRecoilState, useRecoilValue, selector } = recoil;
import CenterFlex from './CenterFlex';

const textsState = atom({
    key: 'textsState',
    default: ['','','']
});

const lastUpdatedState = atom({
    key: 'lastUpdatedState',
    default: 0
})

const checkValidNumberText = (text: string) =>  text.length > 0 && text.charAt(text.length-1) !== '.' && !isNaN(Number(text));

const outputState = selector({
    key: 'outputState',
    get: ({get}) => {
        const texts = get(textsState);
        const lastUpdated = get(lastUpdatedState);
        return (() => {
            if((lastUpdated === 0 || lastUpdated === 2) && checkValidNumberText(texts[0])){
                const pace = Number(texts[0]) + Number(texts[2])/60;
                const whole = Math.floor(pace);
                return [whole, 60/pace, Math.floor(60*(pace-whole))];
            }else if(lastUpdated === 1 && checkValidNumberText(texts[1])){
                const speed = Number(texts[1]);
                const pace = 60/speed;
                const whole = Math.floor(pace);
                return [whole, speed, Math.floor(60*(pace-whole))];
            }else{
                return [NaN, NaN, NaN];
            }
        })()
        .map(num => Math.round(num * 100) / 100)
        .map(num => isNaN(num) ? '' : num.toString());
    }
})

const DataInput = (props: any) => {
    const theme = useTheme();
    const [contents, setContents] = useRecoilState(textsState);
    const [lastUpdated, setLastUpdated] = useRecoilState(lastUpdatedState);
    const output = useRecoilValue(outputState);
    const { index, placeholder, numberOnly, unit } = props;
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
                value={ lastUpdated % 2 === index % 2 ? contents[index] : output[index] }
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
                    setContents([...contents.slice(0,index), raw, ...contents.slice(index+1)]);
                    setLastUpdated(index);
                }}
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

interface AppProps { }

const App = ({ }: AppProps) => {
    const theme = useTheme();
    return (
        <CenterFlex h="100vh" w="100vw" className="App" bg={theme.colors.gray[900]}>
            <CenterFlex h="100vh" w="80vmin" alignItems="stretch">
                <Heading m="10px" color={theme.colors.red[400]} size="2xl" fontSize="10vmin" textAlign="center">
                    Pace2Speed
                </Heading>
                <Stack isInline={true} m="10px">
                    <DataInput index={0} placeholder="Pace" numberOnly={true} unit="min" />
                    <DataInput index={2} placeholder="Pace" numberOnly={true} unit="sec" />
                </Stack>
                <Box m="10px">
                    <DataInput index={1} bg={theme.colors.teal[200]} placeholder="Speed" unit="kmph" />
                </Box>
            </CenterFlex>
        </CenterFlex>
    );
};

export default App;
