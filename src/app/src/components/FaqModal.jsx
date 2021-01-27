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
                        <StyledAccordionItem title='How are the country- and region-level statistics calculated?'>
                            <StyledText>
                                The country-level statistics provided reflect
                                the percentage of respondents in each
                                country/region providing a given response to
                                each question. These percentages are calculated
                                based on all people who responded to a given
                                question (even if their response is “Don’t Know”
                                or “Prefer not to respond”). These percentages
                                are then calibrated to provide estimates
                                representing the online population in each
                                country and then disaggregated for men and
                                women, shedding light on gender differences
                                within countries and regions. Weights were
                                applied at the individual respondent level
                                before aggregation. Visit the website to learn
                                more about the methodology (see link above).
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='How should I interpret the values?'>
                            <StyledText>
                                Unless otherwise indicated in the Codebook, a
                                value is the percent of all respondents of that
                                gender who responded to that specific variable.
                                For instance, a value of “56” for variable
                                “a1_neutral” for gender “Female” means that 56%
                                of all females who answered question A1
                                responded “neutral.”
                            </StyledText>
                            <StyledText>
                                The codebook indicates exceptions, which are
                                usually done to enable sharing of data where
                                individual response counts are too low to
                                preserve privacy.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title="Why aren't all countries included?">
                            <StyledText>
                                The survey was not administered in every country
                                in the world. (For a list of countries included,{' '}
                                <StyledLink
                                    href='https://dataforgood.fb.com/docs/gendersurveyreport/'
                                    title='visit the website'
                                />{' '}
                                to learn more about the methodology).
                                Additionally, to preserve privacy, responses
                                from countries where response rates were
                                insufficient for country-level representation
                                have been aggregated into a “Rest of region”
                                group for their geographic region. This dataset
                                thus includes data for 116 countries across
                                seven world regions, using the World Bank
                                classification of countries by region.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Why aren’t statistics provided for every response option for each question?'>
                            <StyledText>
                                The country- and region-level estimates are
                                intended to be consistent with those used to
                                write the public report (see link above). In
                                general, the following parameters inform what
                                data is and is not included: We aimed to cover
                                as many variables and response categories as
                                possible within a concise, useful data file.
                                This necessitated excluding some questions that
                                are difficult to interpret or are of limited
                                relevance as country- or region-level aggregate
                                statistics. For a few of the multiple-choice
                                questions, we collapse multiple answers
                                following the same logic used for the public
                                report. The statistics for some response options
                                are blank for some countries where an
                                insufficient number of people responded to
                                ensure representativeness and anonymity. These
                                decisions serve to keep a balance between
                                providing useful data and maintaining a
                                manageable dataset.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='The survey included an "Optional" section. Where is that data?'>
                            <StyledText>
                                In general, respondents were allowed to skip any
                                question(s) they did not want to answer. Due to
                                the nature of online surveys and length of the
                                questionnaire, response rates for this section
                                were too low to warrant including in this
                                dataset.
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='The survey included open-ended questions. Where are those responses?'>
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
                        <StyledAccordionItem title='Can I access the raw survey data?'>
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
                            </StyledText>
                        </StyledAccordionItem>
                        <StyledAccordionItem title='Is the data provided for regions and countries the same?'>
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
                            </StyledText>
                        </StyledAccordionItem>
                    </Accordion>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FaqModal;
