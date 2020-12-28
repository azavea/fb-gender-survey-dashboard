import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

const FaqModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>FAQ</ModalHeader>
                <ModalCloseButton />
                <ModalBody>FAQ content</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FaqModal;
