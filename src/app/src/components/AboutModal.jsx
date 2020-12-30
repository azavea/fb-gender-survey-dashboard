import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

const AboutModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>About the Survey</ModalHeader>
                <ModalCloseButton />
                <ModalBody>About content</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AboutModal;
