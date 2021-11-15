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
            m={3}
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
                                Achieving gender equality is one of society's
                                greatest challenges. Too often, data that
                                illuminates the lived realities of women and
                                girls is missing, outdated, or unreliable.
                                Through its Data for Good program to help
                                researchers, nonprofits, and policymakers make
                                informed and responsive decisions, Meta conducts
                                a survey that covers topics about gender norms,
                                unpaid and household care, access and agency,
                                and COVID-19's impact on these areas.
                            </StyledText>
                            <StyledText>
                                The survey has been fielded in 2020 and 2021
                                over 200 countries. Public, aggregate datasets
                                for the 2020 and 2021 surveys are available at
                                the{' '}
                                <StyledLink
                                    href='https://data.humdata.org/dataset/survey-on-gender-equality-at-home'
                                    title='Humanitarian Data Exchange website'
                                />
                                , and de-identified, record-level response data
                                to most questions may be available to research
                                and nonprofit organizations for research
                                purposes. Meta only shares data publicly once it
                                is aggregated to the country or region level.
                                Before sharing with Data for Good partners, Meta
                                ensures that all survey data are de-identified.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='How the survey contributes to Meta’s mission and the UN Sustainable Development Goals'>
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
                            </StyledText>
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
                                The survey’s questionnaires are designed in
                                consultation with global gender equality
                                experts. The 2020 wave was designed in
                                consultation with the World Bank, UN Women,
                                Equal Measures 2030, and Ladysmith. The 2021
                                wave was designed in partnership with CARE,
                                Ladysmith, the World Bank, and UNICEF.
                            </StyledText>
                            <StyledText>
                                Some of the questions have been borrowed from
                                other surveys (e.g., face-to-face, telephone
                                surveys, etc.), allowing for methodological
                                comparisons. As such, the survey also generates
                                insights useful to researchers undertaking
                                alternative modes of data collection during
                                COVID-19.
                            </StyledText>
                            <StyledText>
                                The questionnaires for each wave may vary. For
                                example, about half of the questions in the 2021
                                questionnaire are different from the 2020
                                questionnaire.
                            </StyledText>
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
                            </StyledText>
                            <StyledText>
                                De-identified, record-level response data to
                                most questions may be available to individuals
                                and non-profit organizations for research
                                purposes. Visit the{' '}
                                <StyledLink
                                    href='https://dataforgood.facebook.com/dfg/tools/survey-on-gender-equality-at-home'
                                    title='Data for Good at Meta website'
                                />{' '}
                                to learn more about how to request access to
                                this microdata.
                            </StyledText>{' '}
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Source code'>
                            <StyledText>
                                The source code for this website is available
                                under an Apache license. The code is available{' '}
                                <StyledLink
                                    href='https://github.com/azavea/fb-gender-survey-dashboard'
                                    title='here'
                                />
                                .
                            </StyledText>
                        </StyledAccordionItem>
                    </Accordion>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AboutModal;
