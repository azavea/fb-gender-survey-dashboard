import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Heading,
    ModalBody,
    ModalCloseButton,
    Accordion,
} from '@chakra-ui/react';

import { StyledAccordionItem, StyledLink, StyledText } from './StyledAccordion';

const AboutModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='2xl'
            scrollBehavior='inside'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    borderBottom='1px solid'
                    borderColor='gray.100'
                    mb={2}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Heading as='h1' size='md' fontWeight='500'>
                        About the Survey
                    </Heading>
                    <ModalCloseButton position='relative' top='0' right='0' />
                </ModalHeader>

                <ModalBody>
                    <Accordion allowToggle>
                        <StyledAccordionItem title='About the Survey on Gender Equality at Home'>
                            <StyledText>
                                In July 2020, approximately half a million
                                people in 208 countries, territories and islands
                                were surveyed on Facebook to capture household
                                gender dynamics during the COVID-19 pandemic.
                                The data provides a global snapshot to help
                                researchers, NGOs, global development
                                institutions, and gender equality advocates
                                identify and track trends and progress towards
                                the UN Sustainable Development Goals (
                                <StyledLink
                                    href='https://sdgs.un.org/goals'
                                    title='SDGs'
                                />
                                ). In 2020, the COVID-19 pandemic provided a
                                special impetus to examine these issues through
                                the survey.
                            </StyledText>{' '}
                            <StyledText>
                                The survey measures attitudes and beliefs about
                                gender equality, participation in unpaid care
                                and domestic work, resource allocation, and
                                COVID-19’s impact on everyday lives. The data
                                sheds light on differences within countries and
                                among world regions regarding the extent to
                                which people agree that men and women should
                                have equal opportunities. The data also
                                highlights gender and region-specific challenges
                                of life during the pandemic, such as food
                                insecurity, access to education and healthcare,
                                and employment prospects.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='How the survey contributes to Facebook’s mission and the UN Sustainable Development Goals'>
                            <StyledText>
                                This survey is part of{' '}
                                <StyledLink
                                    href='https://dataforgood.fb.com/'
                                    title='Data for Good'
                                />{' '}
                                and{' '}
                                <StyledLink
                                    href='https://about.fb.com/news/2020/03/closing-the-gender-data-gap/'
                                    title='Project 17'
                                />
                                , two Facebook programs that use data to drive
                                progress on critical humanitarian issues. Data
                                for Good provides tools built from
                                privacy-protected data on Facebook’s platform,
                                as well as tools developed using satellite
                                imagery and other publicly available sources.
                                Similarly, Project 17 emerged from a commitment
                                Facebook made at the 2019 UN General Assembly to
                                help partners use data to accelerate progress on
                                the SDGs.
                            </StyledText>{' '}
                            <StyledText>
                                The Survey on Gender Equality at Home leverages
                                Facebook’s global reach to fill important
                                information gaps about gender dynamics in
                                communities around the world while preserving
                                users’ privacy from end-to-end. Because the
                                survey data is disaggregated by men and women
                                respondents, it can help policymakers,
                                practitioners, and researchers design and
                                deliver gender-responsive programs and policies
                                that support all SDGs.
                            </StyledText>
                            <StyledText>
                                Visit{' '}
                                <StyledLink
                                    href='https://dataforgood.fb.com/'
                                    title='Data for Good'
                                />
                                ’s website to learn more about these data
                                products, read about{' '}
                                <StyledLink
                                    href='https://about.fb.com/news/2020/03/closing-the-gender-data-gap/'
                                    title='Project 17'
                                />
                                , and learn{' '}
                                <StyledLink
                                    href='https://facebookatunga.com/'
                                    title='here'
                                />{' '}
                                about how Facebook contributes to the SDGs.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Designing the survey'>
                            <StyledText>
                                The survey was developed with inputs and
                                collaboration from the World Bank, UN Women,
                                Equal Measures 2030, and Ladysmith. Some of the
                                questions have been borrowed from other surveys
                                (e.g., face-to-face, telephone surveys, etc.),
                                allowing for methodological comparisons. As
                                such, the survey also generates insights useful
                                to researchers undertaking alternative modes of
                                data collection during COVID-19. The survey was
                                also designed to avoid “survey fatigue,” where
                                respondents begin to disengage from the survey
                                content and responses become less reliable.
                                Further details on the methodology are available{' '}
                                <StyledLink
                                    href='https://dataforgood.fb.com/wp-content/uploads/2020/09/Survey-on-Gender-Equality-at-Home-Report-1.pdf#page=60'
                                    title='here'
                                />
                                .
                            </StyledText>{' '}
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Limitations of the data'>
                            <StyledText>
                                The survey is limited to respondents who have
                                Internet access, were active Facebook users
                                during the fielding of the survey, and opted to
                                take a survey through the platform. Knowledge of
                                the overall demographics of the online
                                population in each country and region allows for
                                calibration such that estimates are
                                representative at these levels. However, this
                                means the results only tell us something about
                                the online population in each country/region,
                                not the overall population.
                            </StyledText>{' '}
                            <StyledText>
                                Additionally, estimates have only been generated
                                for respondents who self-reported their gender
                                as male or female. The survey included an
                                “other” option but very few respondents selected
                                it, making it impossible to generate meaningful
                                estimates for populations who identify as
                                non-binary.
                            </StyledText>{' '}
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Accessing the data'>
                            <StyledText>
                                The aggregate regional and country-level
                                statistics for the Survey on Gender Equality at
                                Home, which are used to power this dashboard,
                                can be downloaded on the{' '}
                                <StyledLink
                                    href='https://data.humdata.org/organization/facebook'
                                    title='Humanitarian Data Exchange'
                                />
                                .
                            </StyledText>{' '}
                            <StyledText>
                                De-identified, record-level response data to
                                most questions may be available to individuals
                                and non-profit organizations for research
                                purposes. Please email{' '}
                                <StyledLink
                                    href='mailto:gendersurvey@fb.com'
                                    title='gendersurvey@fb.com'
                                />{' '}
                                if you are interested in learning more.
                            </StyledText>{' '}
                        </StyledAccordionItem>
                    </Accordion>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AboutModal;
