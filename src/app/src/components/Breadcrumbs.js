import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Box,
} from '@chakra-ui/react';

import { ROUTES } from '../utils/constants';

const CustomBreadcrumb = ({ isCurrentPage, icon, title, to }) => {
    if (isCurrentPage) {
        return (
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                    textTransform='uppercase'
                    size='sm'
                    fontWeight='600'
                    letterSpacing='1px'
                    fontSize='0.875rem'
                    px={{ base: 3, md: 2 }}
                    py={{ base: 0, md: 1 }}
                    display='inline-flex'
                >
                    {title}
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    } else {
        return (
            <BreadcrumbItem>
                <BreadcrumbLink
                    as={Link}
                    to={to}
                    display='flex'
                    flex='1 0 auto'
                >
                    <Box as='span' mr={1}>
                        {icon}
                    </Box>
                    {title}
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    }
};

const Breadcrumbs = () => {
    const { pathname } = useLocation();

    const isQuestions = pathname === ROUTES.QUESTIONS;
    const isYears = pathname === ROUTES.YEARS;
    const isCharts = pathname === ROUTES.VISUALIZATIONS;

    return (
        <Box
            bg='gray.600'
            w='100%'
            py={{ base: 2, md: 4 }}
            px={{ base: 2, md: 4, lg: 8 }}
            color='white'
            spacing={1}
            sx={{
                '.chakra-breadcrumb__list': {
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    maxW: '1200px',
                    mx: 'auto',
                },
            }}
        >
            <Breadcrumb>
                <CustomBreadcrumb
                    to={ROUTES.HOME}
                    title='Regions & Countries'
                    icon={<IoIosHome size={18} />}
                />
                {(isYears || isQuestions || isCharts) && (
                    <CustomBreadcrumb
                        to={ROUTES.YEARS}
                        title='Years'
                        isCurrentPage={isYears}
                    />
                )}
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
