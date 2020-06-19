import React, { useState, useEffect } from 'react';
import { Box, Stack, useTheme, Heading } from '@chakra-ui/core';
import DataInput from './DataInput';
import { checkValidNumberText, formatNumber } from './helper';
interface Pace2SpeedProps { }

const Pace2Speed = ({ }: Pace2SpeedProps) => {
	const theme = useTheme();
	const [paceMin, setPaceMin] = useState<string>('');
	const [paceSec, setPaceSec] = useState<string>('');
	const [speed, setSpeed] = useState<string>('');
	const [lastUpdated, setLastUpdated] = useState<number>(0);
	const updateStates = (lastUpdated: number) => {
		if((lastUpdated === 0 || lastUpdated === 2) && checkValidNumberText(paceMin) && checkValidNumberText(paceSec)){
			const pace = Number(paceMin) + Number(paceSec)/60;
			setSpeed(formatNumber(60/pace));
		}else if(lastUpdated === 1 && checkValidNumberText(speed)){
			const spnum = Number(speed);
			const pace = 60/spnum;
			const whole = Math.floor(pace);
			setPaceMin(formatNumber(whole));
			setPaceSec(formatNumber(Math.floor(60*(pace-whole))));
		}
	}
	useEffect(() => { updateStates(lastUpdated) });
	const withLastUpdated = (callback: (st: string) => void, index?: number) => {
		return (content: string) => {
			callback(content);
			if(index !== undefined) setLastUpdated(index);
		}
	}
    return (
        <>
			<Heading m="10px" color={theme.colors.red[400]} size="2xl" fontSize="10vmin" textAlign="center">
				Pace2Speed
			</Heading>
			<Stack isInline={true} m="10px 30px">
				<DataInput content={paceMin} setContent={withLastUpdated(setPaceMin, 0)} placeholder="Pace" numberOnly={true} unit="min" />
				<DataInput content={paceSec} setContent={withLastUpdated(setPaceSec, 2)} placeholder="Pace" numberOnly={true} unit="sec" />
			</Stack>
			<Box m="10px 30px">
				<DataInput content={speed} setContent={withLastUpdated(setSpeed, 1)} bg={theme.colors.teal[200]} placeholder="Speed" unit="kmph" />
			</Box>
		</>
    );
};

export default Pace2Speed;
