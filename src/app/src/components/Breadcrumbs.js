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
                    px={2}
                    py={1}
                    display='inline-flex'
                >
                    {title}
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    } else {
        return (
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to={to} display='flex'>
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
    const isCharts = pathname === ROUTES.VISUALIZATIONS;

    return (
        <Box
            bg='gray.600'
            w='100%'
            py={4}
            px={{ base: 1, md: 4, lg: 8 }}
            color='white'
            spacing={1}
            sx={{
                '.chakra-breadcrumb__list': {
                    display: 'flex',
                    alignItems: 'center',
                },
            }}
        >
            <Breadcrumb>
                <CustomBreadcrumb
                    to={ROUTES.HOME}
                    title='Regions & Countries'
                    icon={<IoIosHome size={18} />}
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
