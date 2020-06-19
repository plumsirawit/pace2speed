import React, { useState, useEffect } from 'react';
import {Divider, Box, useTheme, Heading, Stack} from '@chakra-ui/core';
import DataInput from './DataInput';
import Switch from './Switch';
import CenterFlex from './CenterFlex';
import { checkValidNumberText } from './helper';

const Calculator = () => {
	const theme = useTheme();
    const [selectedChoice, setSelectedChoice] = useState<string | number | undefined>(0);
    const [paceMin, setPaceMin] = useState<string>('');
	const [paceSec, setPaceSec] = useState<string>('');
    const [speed, setSpeed] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [timeMin, setTimeMin] = useState<string>('');
    const [timeSec, setTimeSec] = useState<string>('');
    useEffect(() => {
        if(
            (
                selectedChoice === 0 &&
                (!checkValidNumberText(paceMin) || !checkValidNumberText(paceSec))
            ) ||
            (
                selectedChoice === 1 &&
                (!checkValidNumberText(speed))
            ) ||
            !checkValidNumberText(distance)
            ){
                setTimeMin('');
                setTimeSec('');
                return;
            }
        const secpk = selectedChoice === 0 ? Number(paceMin) * 60 + Number(paceSec) : 3600 / Number(speed);
        const time = secpk * Number(distance) / 1000;
        const tempTimeMin = Math.floor(time / 60);
        setTimeMin(tempTimeMin.toString());
        setTimeSec(Math.floor(time - tempTimeMin * 60).toString());
    }, [paceMin, paceSec, speed, distance, selectedChoice]);
	return <>
		<Heading m="10px" color={theme.colors.red[400]} size="2xl" fontSize="10vmin" textAlign="center">
			Calculator
		</Heading>
		<CenterFlex flexDirection={["column", "column", "column", "row"]} w="100%" paddingX="30px" boxSizing="border-box">
			<Box w={["80vw", "80vw", "80vw", "auto"]} m="10px 10px 10px 0px">
				<Switch choices={['Pace', 'Speed']} value={selectedChoice} onChange={val => setSelectedChoice(val)} />
			</Box>
			<CenterFlex flex="1">
				{
				selectedChoice === 0 ?
				<Stack isInline m="10px 0px" w="100%">
					<DataInput content={paceMin} setContent={setPaceMin} index={0} placeholder="Pace" numberOnly={true} unit="min" />
					<DataInput content={paceSec} setContent={setPaceSec} index={2} placeholder="Pace" numberOnly={true} unit="sec" />
				</Stack> :
				<Box m="10px 0px" w="100%">
					<DataInput content={speed} setContent={setSpeed} index={1} bg={theme.colors.teal[200]} placeholder="Speed" unit="kmph" />
				</Box>
				}
			</CenterFlex>
		</CenterFlex>
		<Box m="10px 30px">
			<DataInput content={distance} setContent={setDistance} index={3} bg={theme.colors.green[200]} placeholder="Distance" unit="m" />
		</Box>
		<Divider />
        <Stack isInline m="10px 30px">
            <DataInput isReadOnly bg={theme.colors.purple[200]} content={timeMin} setContent={() => {}} index={4} placeholder="Time" numberOnly={true} unit="min" />
            <DataInput isReadOnly bg={theme.colors.purple[200]} content={timeSec} setContent={() => {}} index={5} placeholder="Time" numberOnly={true} unit="sec" />
        </Stack>
	</>;
}
export default Calculator;