// Tạo ra một props chứa các thuộc tính của Modal(Ctrl + chuột trái thẻ Modal để xem)

import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Spinner } from "reactstrap";


const ConfirmModal = ({
    title,
    children,
    onSubmit,
    toggle,
    isOpen,
    color = "danger",
    submitText }) => {

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        await onSubmit();
        setSubmitting(false);
    }

    return <Modal isOpen={isOpen}>
        <ModalHeader>
            {title}
        </ModalHeader>
        <ModalBody>
            {children}
        </ModalBody>
        <ModalFooter>
            <Button color={color} onClick={handleSubmit}>
                {submitText} {submitting && <Spinner sm="sx"></Spinner>}
            </Button>{' '}
            <Button color="secondary" onClick={() => { toggle(null) }}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
}

export default ConfirmModal;