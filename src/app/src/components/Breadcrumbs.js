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
            <BreadcrumbItem spacing={1} isCurrentPage>
                <BreadcrumbLink>
                    <Box bg='rgb(72, 86, 92)' size='sm' p={4}>
                        {title}
                    </Box>
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    } else {
        return (
            <BreadcrumbItem spacing={1}>
                <BreadcrumbLink as={Link} to={to}>
                    <Button
                        bg='rgb(39, 55, 63)'
                        size='sm'
                        p={4}
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
        <Box bg='rgb(72, 86, 92)' w='100%' p={4} color='white'>
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
