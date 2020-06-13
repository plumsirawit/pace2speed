import React from 'react';
import { Flex } from '@chakra-ui/core';
export const CenterFlex = (props: any) => {
    return <Flex
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...props}
    />;
}
export default CenterFlex;