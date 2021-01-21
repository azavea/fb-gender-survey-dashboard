import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Box,
    Button,
} from '@chakra-ui/react';

import { ROUTES } from '../utils/constants';

const CustomBreadcrumb = ({ isCurrentPage, icon, title, to }) => {
    if (isCurrentPage) {
        return (
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>
                    <Box
                        textTransform='uppercase'
                        size='sm'
                        letterSpacing='1px'
                        fontSize='0.875rem'
                        p={4}
                    >
                        {title}
                    </Box>
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    } else {
        return (
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={to}>
                    <Button
                        size='sm'
                        variant='breadcrumbButton'
                        leftIcon={icon}
                    >
                        {title}
                    </Button>
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    }
};

const Breadcrumbs = () => {
    const { pathname } = useLocation();

    const isQuestions = pathname === ROUTES.QUESTIONS;
    const isCharts = pathname === ROUTES.VISUALIZATIONS;

    return (
        <Box
            bg='gray.600'
            w='100%'
            py={1}
            px={{ base: 1, md: 4, lg: 8 }}
            color='white'
            spacing={1}
        >
            <Breadcrumb>
                <CustomBreadcrumb
                    to={ROUTES.HOME}
                    title='Regions & Countries'
                    icon={<IoIosHome />}
                />
                {(isQuestions || isCharts) && (
                    <CustomBreadcrumb
                        to={ROUTES.QUESTIONS}
                        title='Questions'
                        isCurrentPage={isQuestions}
                    />
                )}
                {isCharts && (
                    <CustomBreadcrumb
                        to={ROUTES.VISUALIZATIONS}
                        title='Charts'
                        isCurrentPage
                    />
                )}
            </Breadcrumb>
        </Box>
    );
};

export default Breadcrumbs;
