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

const FaqModal = ({ isOpen, onClose }) => {
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
                        FAQ
                    </Heading>
                    <ModalCloseButton position='relative' top='0' right='0' />
                </ModalHeader>
                <ModalBody>
                    <Accordion allowToggle>
                        <StyledAccordionItem title='What data does this dashboard show?'>
                            <StyledText>
                                This dashboard shows the public, aggregate data
                                for all waves of the Survey on Gender Equality
                                at Home. This data is available at the{' '}
                                <StyledLink
                                    href='https://data.humdata.org/dataset/survey-on-gender-equality-at-home'
                                    title='Humanitarian Data Exchange website'
                                />{' '}
                                and is shared through the{' '}
                                <StyledLink
                                    href='https://dataforgood.fb.com/'
                                    title='Data for Good at Meta program'
                                />
                                .
                            </StyledText>
                        </StyledAccordionItem>

                        <StyledAccordionItem title='What are the differences between the 2020 and 2021 waves?'>
                            <StyledText>
                                There are some similarities and differences
                                between the 2020 and 2021 waves of the Survey on
                                Gender Equality at Home. For example, about half
                                of the questions in the 2021 questionnaire are
                                different from the 2020 questionnaire, and the
                                sample size was different for each wave. Visit
                                the{' '}
                                <StyledLink
                                    href='https://dataforgood.facebook.com/dfg/tools/survey-on-gender-equality-at-home'
                                    title='Data for Good at Meta website'
                                />{' '}
                                for more information about each wave.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Was the sample size and geographical coverage the same for both waves?'>
                            <StyledText>
                                No. The sample for the 2020 questionnaire
                                included over 460,000 respondents across 208
                                geographies, compared to over 96,000 respondents
                                across 200 geographies in 2021. The country
                                selection page on this dashboard includes a
                                clarification for those geographies for which
                                only data from 2020 or 2021 is available.
                            </StyledText>
                            <StyledText>
                                Because of these differences, caution must be
                                given to drawing comparisons between regions or
                                countries across waves. For example, different
                                countries constituted the East Asia and Pacific
                                region in 2020 compared to in 2021.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Where can I see the questionnaire for each wave?'>
                            <StyledText>
                                The questionnaire for each wave is included in
                                the global report for each wave, available at
                                the{' '}
                                <StyledLink
                                    href='https://dataforgood.facebook.com/dfg/tools/survey-on-gender-equality-at-home'
                                    title='Data for Good at Meta website'
                                />
                                .
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='How do I cite this data?'>
                            <StyledText>
                                Please cite this data as: Data for Good at Meta
                                (2021). Survey on Gender Equality at Home.
                                Available at:
                                https://dataforgood.facebook.com/dfg/docs/survey-on-gender-equality-at-home-2021-report
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Can I access the raw survey data for the 2020 or 2021 waves?'>
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
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='The questionnaires included open-ended questions. Where are those responses?'>
                            <StyledText>
                                Responses to open-ended questions are not
                                included in this dataset to ensure respondents’
                                privacy.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Is this data statistically representative of the populations of these countries/regions?'>
                            <StyledText>
                                No. Weights were applied to ensure this data is
                                representative of the online population of the
                                country/region, but not the total (online and
                                offline) population. Please be mindful of this
                                limitation when conducting your analysis. We
                                have included an estimate of Internet
                                penetration for each country/region to give
                                users a sense of the population that responses
                                from each country represents.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Where can I learn more about the specific limitations and features of each wave?'>
                            <StyledText>
                                Download and review the public, aggregate
                                datasets for the 2020 and 2021 surveys at the{' '}
                                <StyledLink
                                    href='https://data.humdata.org/dataset/survey-on-gender-equality-at-home'
                                    title='Humanitarian Data Exchange website'
                                />
                                . These files include FAQs and Codebooks with
                                important information to guide your
                                interpretation and use of these insights.
                            </StyledText>
                        </StyledAccordionItem>
                    </Accordion>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FaqModal;
