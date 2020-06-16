import React from 'react';
import { Box, Stack, useTheme, Heading } from '@chakra-ui/core';
import DataInput from './DataInput';

interface Pace2SpeedProps { }

const Pace2Speed = ({ }: Pace2SpeedProps) => {
    const theme = useTheme();
    return (
        <>
			<Heading m="10px" color={theme.colors.red[400]} size="2xl" fontSize="10vmin" textAlign="center">
				Pace2Speed
			</Heading>
			<Stack isInline={true} m="10px 30px">
				<DataInput index={0} placeholder="Pace" numberOnly={true} unit="min" />
				<DataInput index={2} placeholder="Pace" numberOnly={true} unit="sec" />
			</Stack>
			<Box m="10px 30px">
				<DataInput index={1} bg={theme.colors.teal[200]} placeholder="Speed" unit="kmph" />
			</Box>
		</>
    );
};

export default Pace2Speed;
