import { useEffect, useState } from "react";
import { Form, Input, Label } from "reactstrap";
import albumApi from "../../api/album.api";
import ConfirmModal from "../../components/ConfirmModal";

const ModalEditAlbum = ({ editItem, closeModal, updateAlbum }) => {
    const [formvalue, setFormValue] = useState({
        title: ''
    });

    useEffect(() => {
        if (editItem) {
            setFormValue({
                title: editItem.title
            })
        }
    }, [editItem]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormValue(prev => ({ ...prev, [name]: value }));
        console.log(formvalue);
    }

    return (
        <ConfirmModal
            color="primary"
            isOpen={editItem !== null ? true : false}
            toggle={closeModal}
            title={'Update Album ID'}
            submitText={'Update'}
            onSubmit={async () => { await updateAlbum(formvalue) }}
        >
            <Form>
                <Label for="title">Title</Label>
                <Input type="text" value={formvalue.title}
                    name="title"
                    onChange={(event) => { onChange(event) }}
                ></Input>
            </Form>
        </ConfirmModal>
    );
}

export default ModalEditAlbum;